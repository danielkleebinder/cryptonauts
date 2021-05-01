// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CryptoverseMarket.sol";
import "./CryptoverseExploration.sol";
import "./CryptoverseFights.sol";

/**
 * @title Cryptoverse Game
 * @dev This is the contract which has to be deployed to actually play the game.
 */
contract CryptoverseGame is CryptoverseMarket, CryptoverseExploration, CryptoverseFights {
}