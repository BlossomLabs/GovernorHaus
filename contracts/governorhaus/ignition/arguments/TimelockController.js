const args = {
  minDelay: 1 * 24 * 60 * 60,
  proposers: [],
  executors: [],
  // Modify this at convenience (should be GovernorHaus address)
  admin: "0xA991B2Cf871a746bbc54b87E371498B2347ffE26",
};

module.exports = [args.minDelay, args.proposers, args.executors, args.admin];
