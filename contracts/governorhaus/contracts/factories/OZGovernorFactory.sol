// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { IVotes } from "@openzeppelin/contracts/governance/utils/IVotes.sol";
import { OZGovernor, TimelockController } from "../gov-deployer/OZGovernor.sol";

contract OZGovernorFactory {
    function createGovernor(
        string memory _name, IVotes _token, TimelockController _timelock,
        uint48 _initialVotingDelay, uint32 _initialVotingPeriod, uint256 _initialProposalThreshold,
        uint256 _quorumNumeratorValue,        
        uint48 _initialVoteExtension
    ) external returns (OZGovernor) {
        return new OZGovernor(_name, _token, _timelock, _initialVotingDelay, _initialVotingPeriod, _initialProposalThreshold, _quorumNumeratorValue, _initialVoteExtension);
    }
}
