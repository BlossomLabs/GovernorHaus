import { HardhatUserConfig } from "hardhat/config";
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
    'base-sepolia': {
      url: 'https://sepolia.base.org',
      accounts: [process.env.WALLET_KEY as string],
      gasPrice: 1000000000,
    },
  },
  etherscan: {
    apiKey: {
     "base-sepolia": process.env.BLOCKSCOUT_KEY as string
    },
    customChains: [
      {
        network: "base-sepolia",
        chainId: 84532,
        urls: {
         apiURL: "https://base-sepolia.blockscout.com/api",
         browserURL: "https://base-sepolia.blockscout.com"
        }
      }
    ]
  },
  sourcify: {
    enabled: false,
  },
};

export default config;
