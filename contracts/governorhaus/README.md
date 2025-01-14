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
bunx hardhat vars set ETHERSCAN_KEY_OPTIMISM # API key from optimistic.etherscan.io
# or
bunx hardhat vars set ETHERSCAN_KEY_CELO # API key from celoscan.org

bun run verify:<network>
bunx hardhat verify --network <network> <erc20TokenAddr> "HausDAO" "HAUS" <GovernorHausAddr> <timelockAddr> <GovernorHausAddr>
bunx hardhat verify --network <network> <ozGovernorAddr> HausDAO <erc20TokenAddr> <timelockAddr> 1 43200 1000000000000000000000000 4 0
# Modify the TimelockController.js file at convenience
bunx hardhat verify --network <network> <timelockAddr> --constructor-args ignition/arguments/TimelockController.js
```
