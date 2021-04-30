// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC223/ERC223Mintable.sol";
import "./ERC223/ERC223Burnable.sol";

/**
 * @title Cryptoverse Game
 * @dev Cryptoverse is a game which is based on mintable and burnable
 *      tokens and explorable planets and well as a fighting system.
 */
contract Cryptoverse is ERC223Mintable, ERC223Burnable {
}