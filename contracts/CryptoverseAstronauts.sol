// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Cryptoverse.sol";

/**
 * @title Cryptoverse Planet System
 * @dev The cryptoverse astronaut system manages all astronauts (i.e. players). This contract can
 *      throw the following error codes:
 *
 *        - E-A1: You do not have enough tokens to level up your astronaut
 *        - E-A2: You did not provide a property that you want to upgrade when leveling up you astronaut
 *
 */
contract CryptoverseAstronauts is Cryptoverse {

    event AstronautLevelUp(address owner, uint32 newLevel);

    // An astronaut is the players character used in the game. It is important to
    // notice that each player can only have one single astronaut.
    struct Astronaut {
        address id;

        // Current astronaut level. Astronauts are only capable of doing something
        // after reaching level 1.
        uint32 level;

        // Fighting win and loss count
        uint32 winCount;
        uint32 lossCount;

        // Base health (max health available to the player) and current health
        uint32 baseHealth;
        uint32 health;

        // Specialization properties
        uint32 mining;
        uint32 attack;
        uint32 defense;
    }

    Astronaut[] public astronauts;
    mapping(address => Astronaut) ownerToAstronaut;

    uint private levelUpFactor = 3;


    /**
     * @dev Levels up the astronaut by one level and burns the level up cost
     *      worth in tokens.
     */
    function levelUpAstronaut(string memory _upgradeProperty) external {
        Astronaut storage astronaut = ownerToAstronaut[msg.sender];
        uint levelUpCost = getAstronautLevelUpCost();

        // Burn the level up cost
        require(balanceOf(msg.sender) >= levelUpCost, "E-A1");
        burn(levelUpCost);

        // I only push the astronaut to the list of astronaut if he or she has at least
        // reached level 1. Otherwise the astronaut cannot fight and is not visible to
        // other players. This is some sort of "Noob-Protection".
        if (astronaut.level <= 0) {
            astronauts.push(astronaut);
        }

        // Level up the astronaut, improve it's stats a bit and fully heal it
        astronaut.level++;
        astronaut.baseHealth += 10;
        astronaut.health = astronaut.baseHealth;
        astronaut.mining++;
        astronaut.attack++;
        astronaut.defense++;
        astronaut.id = msg.sender;

        // Every level up has to come with one specific upgrade property in which the
        // player wants to specialize his or her cryptonaut in.
        bytes32 encodedUpgradeProperty = keccak256(abi.encodePacked(_upgradeProperty));
        if (encodedUpgradeProperty == keccak256(abi.encodePacked("mining"))) {
            astronaut.mining += 5;
        } else if (encodedUpgradeProperty == keccak256(abi.encodePacked("attack"))) {
            astronaut.attack += 5;
        } else if (encodedUpgradeProperty == keccak256(abi.encodePacked("defense"))) {
            astronaut.defense += 5;
        } else {
            require(false, "E-A2");
        }

        // Emit the astronaut level up event
        emit AstronautLevelUp(msg.sender, astronaut.level);
    }

    /**
     * @dev Returns the cost in tokens that the next level up costs.
     */
    function getAstronautLevelUpCost() public view returns (uint) {
        Astronaut memory astronaut = ownerToAstronaut[msg.sender];
        uint level = uint(astronaut.level);
        return level ** levelUpFactor + level * levelUpFactor;
    }

    /**
     * @dev Returns the players astronaut.
     */
    function getAstronaut() external view returns (Astronaut memory) {
        return ownerToAstronaut[msg.sender];
    }

    /**
     * @dev Returns all astronauts currently stored in this contract.
     */
    function getAstronauts() external view returns (Astronaut[] memory) {
        return astronauts;
    }

    /**
     * @dev Sets the level up cost factor. This is used to provide a function
     *      which levels up the player using a certain amount of tokens.
     */
    function setLevelUpFactor(uint _levelUpFactor) external onlyOwner {
        levelUpFactor = _levelUpFactor;
    }
}
