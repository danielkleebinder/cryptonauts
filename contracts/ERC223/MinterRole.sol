// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Roles.sol";

contract MinterRole {
    using Roles for Roles.Role;

    event MinterAdded(address account);
    event MinterRemoved(address account);

    Roles.Role private _minters;

    constructor () {
        _addMinter(msg.sender);
    }

    modifier onlyMinter() {
        require(isMinter(msg.sender));
        _;
    }

    function isMinter(address account) public view returns (bool) {
        return _minters.has(account);
    }

    function addMinter(address account) public onlyMinter {
        _addMinter(account);
    }

    function renounceMinter() public {
        _removeMinter(msg.sender);
    }

    function _addMinter(address account) internal {
        _minters.add(account);
        emit MinterAdded(account);
    }

    function _removeMinter(address account) internal {
        _minters.remove(account);
        emit MinterRemoved(account);
    }
}
