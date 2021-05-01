// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CryptoverseAstronauts.sol";
import "./CryptoversePlanets.sol";
import "./CryptoverseItems.sol";

/**
 * @title Cryptoverse Market
 * @dev The cryptoverse market is used to trade items.
 */
contract CryptoverseMarket is CryptoversePlanets, CryptoverseAstronauts, CryptoverseItems {
    
	uint private tokenPrice = 100;
	
	/**
	 * @dev Sets the token price. This is the price required to buy
	 *      exactly one token.
	 */
	function setTokenPrice(uint _price) external onlyOwner {
	    tokenPrice = _price;
	}
	
	/**
	 * @dev Returns the current token price. The token price may fluctuate
	 *      depending on the market.
	 */
	function getTokenPrice() external view returns (uint) {
	    return tokenPrice;
	}
	
	/**
	 * @dev Buys as much tokens as possible with the given msg.value. The
	 *      amount of tokens received depends on the current token price.
	 */
	function buyTokens() external payable {
	    require(msg.value > 0, "Send Ether to buy tokens");
	    require(msg.value >= tokenPrice, "The provided Ether must at least equal the token price");
	    mint(msg.sender, msg.value / tokenPrice);
	}
}