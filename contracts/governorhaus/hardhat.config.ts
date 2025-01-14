import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-ignition-viem";

import { vars } from "hardhat/config";

const ALCHEMY_API_KEY = vars.get("ALCHEMY_API_KEY");
const INFURA_API_KEY = vars.get("INFURA_API_KEY");
const WALLET_KEY = vars.get("WALLET_KEY");
const ETHERSCAN_KEY_OPTIMISM = vars.get("ETHERSCAN_KEY_OPTIMISM");
const ETHERSCAN_KEY_CELO = vars.get("ETHERSCAN_KEY_CELO");

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
      url: `https://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [WALLET_KEY],
    },
    celo: {
      url: `https://celo-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [WALLET_KEY],
      gasPrice: 1000000000000,
    },
  },
  etherscan: {
    apiKey: {
      optimisticEthereum: ETHERSCAN_KEY_OPTIMISM,
      celo: ETHERSCAN_KEY_CELO,
    },
    customChains: [
      {
        network: "celo",
        chainId: 42220,
        urls: {
          apiURL: "https://api.celoscan.io/api",
          browserURL: "https://celoscan.io/",
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
  ignition: {
    strategyConfig: {
      create2: {
        salt: "0x0000000000000000000000000000000000000000000000000000000000000000",
      },
    },
  },
};

export default config;
