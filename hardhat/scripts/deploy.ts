import { viem } from "hardhat";
import { parseEventLogs } from 'viem'
async function main() {

  const publicClient = await viem.getPublicClient()
  const [wallet] = await viem.getWalletClients()

  const erc20Factory = await viem.deployContract("ERC20Factory", []);
  const ozGovernorFactory = await viem.deployContract("OZGovernorFactory", []);
  const timelockControllerFactory = await viem.deployContract("TimelockControllerFactory", []);
  const governorHaus = await viem.deployContract("GovernorHaus", [erc20Factory.address, ozGovernorFactory.address, timelockControllerFactory.address]);

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
    }
  ]);

  const receipt = await publicClient.getTransactionReceipt({
    hash
  })

  const logs = parseEventLogs({ 
    abi: governorHaus.abi, 
    logs: receipt.logs,
  })

  // Type guard to check if log.args has the expected shape
  function isContractDeployedArgs(args: any): args is { contractType: string; contractAddress: `0x${string}` } {
    return args && typeof args.contractType === 'string' && typeof args.contractAddress === 'string';
  }

  logs
    .filter(log => log.eventName === 'ContractDeployed')
    .map(log => log.args)
    .filter(isContractDeployedArgs)
    .map(({ contractType, contractAddress }) => `${contractType} deployed to ${contractAddress}`)
    .forEach(s => console.log(s))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
