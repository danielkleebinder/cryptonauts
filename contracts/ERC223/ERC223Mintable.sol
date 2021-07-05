// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC223.sol";

/**
 * @title ERC223Mintable
 * @dev ERC223 minting logic
 */
contract ERC223Mintable is ERC223Token {
    /**
     * @dev Function to mint tokens
     * @param to The address that will receive the minted tokens.
     * @param value The amount of tokens to mint.
     * @return A boolean that indicates if the operation was successful.
     */
    function mint(address to, uint256 value) internal returns (bool) {
        _mint(to, value);
        return true;
    }
}
