const args = {
  name: "HausDAO",
  // Modify this at convenience (should be ERC20Token address)
  token: "0x5382300C189cA698ed1826a3ED82263AeeBcd33B",
  // Modify this at convenience (should be TimelockController address)
  timelock: "0x3c89ee2C9419001F194596f889EAD89BbE1f80fb",
  initialVotingDelay: 1,
  initialVotingPeriod: 43200,
  initialProposalThreshold: "1000000000000000000000000",
  quorumNumeratorValue: 4,
  initialVoteExtension: 0,
};

module.exports = [
  args.name,
  args.token,
  args.timelock,
  args.initialVotingDelay,
  args.initialVotingPeriod,
  args.initialProposalThreshold,
  args.quorumNumeratorValue,
  args.initialVoteExtension,
];
