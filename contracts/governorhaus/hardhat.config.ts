import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 100,
      },
    },
  },
  networks: {
    optimism: {
      url: "https://optimism-mainnet.gateway.tatum.io",
      accounts: [process.env.WALLET_KEY as string],
    },
    celo: {
      url: "https://forno.celo.org",
      accounts: [process.env.WALLET_KEY as string],
      gasPrice: 10000000000,
    },
  },
  etherscan: {
    apiKey: {
      optimism: process.env.BLOCKSCOUT_KEY as string,
      celo: process.env.BLOCKSCOUT_KEY as string,
    },
    customChains: [
      {
        network: "optimism",
        chainId: 10,
        urls: {
          apiURL: "https://optimism.blockscout.com/api",
          browserURL: "https://optimism.blockscout.com",
        },
      },
      {
        network: "celo",
        chainId: 42220,
        urls: {
          apiURL: "https://explorer.celo.org/mainnet/api",
          browserURL: "https://explorer.celo.org/mainnet",
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
};

export default config;
