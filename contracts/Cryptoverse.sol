// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC223/ERC223.sol";
import "./ERC223/ERC223Mintable.sol";
import "./ERC223/ERC223Burnable.sol";
import "./ERC223/Roles.sol";

/**
 * @title Cryptoverse Base Administrative Contract
 *
 * @dev Cryptoverse is a game which is based on mintable and burnable
 *      tokens and explorable planets as well as a fighting system. The
 *      following error codes might occur:
 *
 *        - E-C1: You are not the game contract owner
 *        - E-C2: You have to send Ether to buy tokens
 *        - E-C3: The token price is higher than the sent Ether amount
 *
 */
contract Cryptoverse is ERC223Token, ERC223Mintable, ERC223Burnable {

    using Roles for Roles.Role;

    event OwnerAdded(address account);
    event OwnerRemoved(address account);

	event ReceivedEther(address from, uint val);

    Roles.Role private owners;

	uint public tokenPrice = 100;


    constructor() {
        // The creator of the game contract is also the first owner
        owners.add(msg.sender);
        emit OwnerAdded(msg.sender);
    }

    /**
     * @dev Some actions can only be performed by the game owner.
     */
    modifier onlyOwner() {
        require(isOwner(), "E-C1");
        _;
    }

    function isOwner() public view returns (bool) {
        return owners.has(msg.sender);
    }

    /**
     * @dev Adds a new owner. Be aware, because owners have all the
     *      rights about the contract that you also have.
     */
    function addOwner(address _account) external onlyOwner {
        owners.add(_account);
        emit OwnerAdded(_account);
    }

    /**
     * @dev Renounces the owner role of the caller.
     */
    function renounceOwner() external onlyOwner {
        owners.remove(msg.sender);
        emit OwnerRemoved(msg.sender);
    }

	/**
	 * @dev Sets the token price. This is the price required to buy
	 *      exactly one token.
	 */
	function setTokenPrice(uint _price) external onlyOwner {
	    tokenPrice = _price;
	}

	/**
	 * @dev Buys as much tokens as possible with the given msg.value. The
	 *      amount of tokens received depends on the current token price.
	 */
	function buyTokens() external payable {
	    require(msg.value > 0, "E-C2");
	    require(msg.value >= tokenPrice, "E-C3");
	    mint(msg.sender, msg.value / tokenPrice);
	}

    /**
     * @dev Default receive fallback function when the contract receives Ether.
     */
	receive() external payable {
	    emit ReceivedEther(msg.sender, msg.value);
	}

	/**
	 * @dev Sends all the Ether to the owner of the game.
	 */
	function redeem() external onlyOwner {
		payable(msg.sender).transfer(address(this).balance);
	}
}
