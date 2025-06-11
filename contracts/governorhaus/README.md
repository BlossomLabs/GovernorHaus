# Governorhaus Contracts

In order to deploy the contracts, follow the steps below:

```shell
bunx hardhat vars set ALCHEMY_KEY # API key from Alchemy.com
bunx hardhat vars set WALLET_KEY # Private key of the wallet that will deploy the contracts
bun run deploy:<network>
```

**⚠️ Note:** In networks that do not support CreateX (such as Celo), the contracts are deployed using the basic strategy, resulting in
a different address than the cannonical one used accross the networks.

In order to verify the contracts, follow the steps below:

```shell
# Set the API keys for the networks you want to verify:
bunx hardhat vars set ETHERSCAN_KEY_OPTIMISM # API key from optimistic.etherscan.io
bunx hardhat vars set ETHERSCAN_KEY_CELO # API key from celoscan.org
bunx hardhat vars set ETHERSCAN_KEY_ARBITRUM # API key from arbiscan.io
bunx hardhat vars set ETHERSCAN_KEY_BASE # API key from basescan.org
bunx hardhat vars set ETHERSCAN_KEY_GNOSIS # API key from gnosisscan.io
bunx hardhat vars set ETHERSCAN_KEY_POLYGON # API key from polygonscan.com

bun run verify:<network>
# Modify the ERC20Token.js file at convenience
bunx hardhat verify --network <network> <erc20TokenAddr> --constructor-args ignition/arguments/ERC20Token.js
# Modify the OZGovernor.js file at convenience
bunx hardhat verify --network <network> <ozGovernorAddr> --constructor-args ignition/arguments/OZGovernor.js
# Modify the TimelockController.js file at convenience
bunx hardhat verify --network <network> <timelockAddr> --constructor-args ignition/arguments/TimelockController.js
```
