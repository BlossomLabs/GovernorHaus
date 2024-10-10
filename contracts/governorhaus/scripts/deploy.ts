import { run, viem } from "hardhat";
import { parseEventLogs } from "viem";

async function deployAndVerify(contractName: string, args: any[]) {
  const contract = await viem.deployContract(contractName, args);
  if (process.env.BLOCKSCOUT_KEY) {
    try {
      await Promise.race([
        run("verify:verify", {
          address: contract.address,
          constructorArguments: args,
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Verification timed out")), 20000),
        ),
      ]);
    } catch (e: any) {
      if (e.name === "ContractAlreadyVerifiedError") {
        console.log(`Contract ${contractName} already verified`);
      } else {
        console.error(e);
      }
    }
  }
  return contract;
}

async function main() {
  const publicClient = await viem.getPublicClient();
  const [wallet] = await viem.getWalletClients();

  const erc20Factory = await deployAndVerify("ERC20Factory", []);

  const ozGovernorFactory = await deployAndVerify("OZGovernorFactory", []);
  const timelockControllerFactory = await deployAndVerify(
    "TimelockControllerFactory",
    [],
  );
  const governorHaus = await deployAndVerify("GovernorHaus", [
    erc20Factory.address,
    ozGovernorFactory.address,
    timelockControllerFactory.address,
  ]);

  console.log(`GovernorHaus deployed to ${governorHaus.address}`);

  const hash = await governorHaus.write.createDao([
    {
      tokenName: "HausDAO",
      tokenSymbol: "HAUS",
      minDelay: BigInt(1 * 24 * 60 * 60),
      governorName: "HausDAO",
      votingDelay: 1,
      votingPeriod: 43200,
      proposalThreshold: 1000000000000000000000000n,
      quorumNumerator: 4n,
      voteExtension: 0,
      firstMintAmount: [1000000000000000000000000n],
      firstMintTo: [wallet.account.address],
    },
  ]);

  const receipt = await publicClient.getTransactionReceipt({
    hash,
  });

  const logs = parseEventLogs({
    abi: governorHaus.abi,
    logs: receipt.logs,
  });

  // Type guard to check if log.args has the expected shape
  function isContractDeployedArgs(
    args: any,
  ): args is { contractType: string; contractAddress: `0x${string}` } {
    return (
      args &&
      typeof args.contractType === "string" &&
      typeof args.contractAddress === "string"
    );
  }

  logs
    .filter((log) => log.eventName === "ContractDeployed")
    .map((log) => log.args)
    .filter(isContractDeployedArgs)
    .map(
      ({ contractType, contractAddress }) =>
        `${contractType} deployed to ${contractAddress}`,
    )
    .map((s) => console.log(s));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
