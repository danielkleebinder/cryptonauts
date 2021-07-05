// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC223 {
    /**
     * @dev Returns the total supply of the token.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the balance of the `who` address.
     */
    function balanceOf(address who) external view returns (uint);

    /**
    * @dev Event that is fired on successful transfer.
    */
    event Transfer(address indexed from, address indexed to, uint value, bytes data);
}
