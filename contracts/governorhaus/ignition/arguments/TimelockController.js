const args = {
  minDelay: 1 * 24 * 60 * 60,
  proposers: [],
  executors: [],
  // Modify this at convenience (should be GovernorHaus address)
  admin: "0xf4F2917f4564D41Fd67e0C8e6Beb37c5E3b1745F",
};

module.exports = [args.minDelay, args.proposers, args.executors, args.admin];
