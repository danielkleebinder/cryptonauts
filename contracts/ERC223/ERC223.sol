// SPDX-License-Identifier: MIT
/**
 * This token implementation relies on solidity version >=0.8.0 which uses the SafeMath-Library by default!!
 */
pragma solidity ^0.8.0;

import './IERC223.sol';

/**
 * @title Reference implementation of the ERC223 standard token.
 */
contract ERC223Token is IERC223 {
    bytes constant empty = hex"00000000";

    uint256 private _totalSupply;

    /**
     * @dev See `IERC223.totalSupply`.
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

    mapping(address => uint) private _balances; // List of user balances.

    /**
     * @dev Transfer the specified amount of tokens to the specified address.
     *      Invokes the `tokenFallback` function if the recipient is a contract.
     *      The token transfer fails if the recipient is a contract
     *      but does not implement the `tokenFallback` function
     *      or the fallback function to receive funds.
     *
     * @param _to    Receiver address.
     * @param _value Amount of tokens that will be transferred.
     * @param _data  Transaction metadata.
     */
    function transfer(address _to, uint _value, bytes memory _data) public override returns (bool success) {
        _balances[msg.sender] = _balances[msg.sender] - (_value);
        _balances[_to] = _balances[_to] + (_value);
        emit Transfer(msg.sender, _to, _value, _data);
        return true;
    }

    /**
     * @dev Transfer the specified amount of tokens to the specified address.
     *      This function works the same with the previous one
     *      but doesn't contain `_data` param.
     *      Added due to backwards compatibility reasons.
     *
     * @param _to    Receiver address.
     * @param _value Amount of tokens that will be transferred.
     */
    function transfer(address _to, uint _value) public override returns (bool success){
        _balances[msg.sender] = _balances[msg.sender] - (_value);
        _balances[_to] = _balances[_to] + (_value);
        emit Transfer(msg.sender, _to, _value, empty);
        return true;
    }

    /**
     * @dev Returns balance of the `_owner`.
     *
     * @param _owner   The address whose balance will be returned.
     * @return balance Balance of the `_owner`.
     */
    function balanceOf(address _owner) public view override returns (uint balance) {
        return _balances[_owner];
    }

    /**
     * @dev Internal function that mints an amount of the token and assigns it to
     * an account. This encapsulates the modification of balances such that the
     * proper events are emitted.
     * @param account The account that will receive the created tokens.
     * @param value The amount that will be created.
     */
    function _mint(address account, uint256 value) internal {
        require(account != address(0));
        _totalSupply = _totalSupply + (value);
        _balances[account] = _balances[account] + (value);
        emit Transfer(address(0), account, value, empty);
    }

    /**
     * @dev Internal function that burns an amount of the token of a given
     * account.
     * @param account The account whose tokens will be burnt.
     * @param value The amount that will be burnt.
     */
    function _burn(address account, uint256 value) internal {
        require(account != address(0));
        _totalSupply = _totalSupply - (value);
        _balances[account] = _balances[account] - (value);
        emit Transfer(account, address(0), value, empty);
    }
}
