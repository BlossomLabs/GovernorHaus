// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { TimelockController } from "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimelockControllerFactory {
    function createTimelockController(
        uint256 minDelay,
        address[] memory proposers,
        address[] memory executors,
        address admin
    ) external returns (TimelockController) {
        return new TimelockController(minDelay, proposers, executors, admin);
    }
}
