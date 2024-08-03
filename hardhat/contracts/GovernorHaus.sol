// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import { ERC20Factory, ERC20Token } from "./factories/ERC20Factory.sol";
import { OZGovernorFactory, OZGovernor } from "./factories/OZGovernorFactory.sol";
import { TimelockControllerFactory, TimelockController } from "./factories/TimelockControllerFactory.sol";

contract GovernorHaus {
    struct DeploymentConfig {
        string tokenName;
        string tokenSymbol;
        uint256 minDelay;
        string governorName;
        uint48 votingDelay;
        uint32 votingPeriod;
        uint256 proposalThreshold;
        uint256 quorumNumerator;
        uint48 voteExtension;
        address[] firstMintTo;
        uint256[] firstMintAmount;
    }

    ERC20Factory public immutable erc20Factory;
    OZGovernorFactory public immutable ozGovernorFactory;
    TimelockControllerFactory public immutable timelockControllerFactory;

    event ContractDeployed(string contractType, address contractAddress);
    event RoleManaged(string role, address account, bool granted);

    constructor(ERC20Factory _erc20Factory, OZGovernorFactory _ozGovernorFactory, TimelockControllerFactory _timelockControllerFactory) {
        erc20Factory = _erc20Factory;
        ozGovernorFactory = _ozGovernorFactory;
        timelockControllerFactory = _timelockControllerFactory;
    }

    function createDao(DeploymentConfig memory config) public returns (address) {
        // Deploy Token
        ERC20Token token = erc20Factory.createToken(config.tokenName, config.tokenSymbol, address(this), address(this), address(this));
        emit ContractDeployed("Token", address(token));

        // Deploy Timelock
        address[] memory proposers = new address[](1);
        address[] memory executors = new address[](1);
        proposers[0] = address(this);
        executors[0] = address(this);
        TimelockController timelock = timelockControllerFactory.createTimelockController(
            config.minDelay,
            proposers,
            executors,
            address(this)
        );
        emit ContractDeployed("Timelock", address(timelock));

        // Deploy Governor
        OZGovernor governor = ozGovernorFactory.createGovernor(
            config.governorName,
            token,
            timelock,
            config.votingDelay,
            config.votingPeriod,
            config.proposalThreshold,
            config.quorumNumerator,
            config.voteExtension
        );
        emit ContractDeployed("Governor", address(governor));

        // Update proposers and executors with actual governor address
        proposers[0] = address(governor);
        executors[0] = address(governor);
        timelock.grantRole(timelock.PROPOSER_ROLE(), address(governor));
        timelock.grantRole(timelock.EXECUTOR_ROLE(), address(governor));

        // Mint initial tokens if configured
        if (config.firstMintAmount.length > 0) {
            for (uint i = 0; i < config.firstMintAmount.length; i++) {
                if (config.firstMintAmount[i] > 0 && config.firstMintTo[i] != address(0)) {
                    token.mint(config.firstMintTo[i], config.firstMintAmount[i]);
                }
            }
        }

        // Manage roles
        token.grantRole(token.MINTER_ROLE(), address(timelock));
        emit RoleManaged("MINTER_ROLE", address(timelock), true);
        token.grantRole(token.DEFAULT_ADMIN_ROLE(), address(timelock));
        emit RoleManaged("DEFAULT_ADMIN_ROLE", address(timelock), true);
        token.revokeRole(token.MINTER_ROLE(), msg.sender);
        emit RoleManaged("MINTER_ROLE", msg.sender, false);
        token.revokeRole(token.DEFAULT_ADMIN_ROLE(), msg.sender);
        emit RoleManaged("DEFAULT_ADMIN_ROLE", msg.sender, false);

        return address(governor);
    }
}
