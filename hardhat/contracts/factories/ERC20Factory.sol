// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ERC20Token } from "../gov-deployer/ERC20Token.sol";

contract ERC20Factory {
    function createToken(
        string memory _name,
        string memory _symbol,
        address defaultAdmin,
        address pauser,
        address minter
    ) external returns (ERC20Token) {
        return new ERC20Token(_name, _symbol, defaultAdmin, pauser, minter);
    }
}
