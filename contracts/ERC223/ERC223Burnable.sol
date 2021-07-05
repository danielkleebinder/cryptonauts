// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC223.sol";

/**
 * @title Burnable Token
 * @dev Token that can be irreversibly burned (destroyed).
 */
contract ERC223Burnable is ERC223Token {
    /**
     * @dev Burns a specific amount of tokens.
     * @param value The amount of token to be burned.
     */
    function burn(uint256 value) public {
        _burn(msg.sender, value);
    }
}
