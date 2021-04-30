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
     * @dev Transfers `value` tokens from `msg.sender` to `to` address
     * and returns `true` on success.
     */
    function transfer(address to, uint value) external returns(bool success);

    /**
     * @dev Transfers `value` tokens from `msg.sender` to `to` address with `data` parameter
     * and returns `true` on success.
     */
    function transfer(address to, uint value, bytes calldata data) external returns (bool success);

    /**
    * @dev Event that is fired on successful transfer.
    */
    event Transfer(address indexed from, address indexed to, uint value, bytes data);
}
