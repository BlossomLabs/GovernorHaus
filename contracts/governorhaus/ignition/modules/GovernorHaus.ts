import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("GovernorHaus", (m) => {
  const erc20Factory = m.contract("ERC20Factory", []);
  const ozGovernorFactory = m.contract("OZGovernorFactory", []);
  const timelockControllerFactory = m.contract("TimelockControllerFactory", []);

  const governorHaus = m.contract("GovernorHaus", [
    erc20Factory,
    ozGovernorFactory,
    timelockControllerFactory,
  ]);

  const dao = m.call(governorHaus, "createDao", [
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
      firstMintTo: [m.getAccount(0)],
    },
  ]);

  const timelockAddress = m.readEventArgument(
    dao,
    "ContractDeployed",
    "contractAddress",
    {
      eventIndex: 0,
    },
  );

  const timelockContract = m.contractAt("TimelockController", timelockAddress);

  const tokenAddress = m.readEventArgument(
    dao,
    "ContractDeployed",
    "contractAddress",
    {
      eventIndex: 1,
    },
  );
  const tokenContract = m.contractAt("ERC20Token", tokenAddress);

  const governorAddress = m.readEventArgument(
    dao,
    "ContractDeployed",
    "contractAddress",
    {
      eventIndex: 2,
    },
  );
  const governorContract = m.contractAt("OZGovernor", governorAddress);

  return {
    erc20Factory,
    ozGovernorFactory,
    timelockControllerFactory,
    governorHaus,
    timelockContract,
    tokenContract,
    governorContract,
  };
});
