const args = {
  name: "HausDAO",
  symbol: "HAUS",
  // Modify this at convenience (should be GovernorHaus address)
  defaultAdmin: "0xf4F2917f4564D41Fd67e0C8e6Beb37c5E3b1745F",
  // Modify this at convenience (should be TimelockController address)
  pauser: "0x3c89ee2C9419001F194596f889EAD89BbE1f80fb",
  // Modify this at convenience (should be GovernorHaus address)
  minter: "0xf4F2917f4564D41Fd67e0C8e6Beb37c5E3b1745F",
};

module.exports = [
  args.name,
  args.symbol,
  args.defaultAdmin,
  args.pauser,
  args.minter,
];
