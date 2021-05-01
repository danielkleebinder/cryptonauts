// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Cryptoverse.sol";

/**
 * @title Cryptoverse Planet System
 * @dev The cryptoverse astronaut system manages all astronauts (i.e. players).
 */
contract CryptoverseAstronauts is Cryptoverse {
    
    event AstronautLevelUp(address owner, uint32 newLevel);
    
    // An astronaut is the players character used in the game. It is important to
    // notice that each player can only have one single astronaut.
    struct Astronaut {
        uint32 level;
        uint32 winCount;
        uint32 lossCount;
        uint32 health;
        uint16 mining;
        uint16 attack;
        uint16 defense;
    }
    
    Astronaut[] public astronauts;
    mapping(address => Astronaut) ownerToAstronaut;
    
    uint private levelUpFactor = 10;

    
    /**
     * @dev Levels up the astronaut by one level and burns the level up cost
     *      worth in tokens.
     */
    function levelUpAstronaut() external {
        Astronaut storage astronaut = ownerToAstronaut[msg.sender];
        
        // Burn the level up cost
        burn(getAstronautLevelUpCost());
        
        // I only push the astronaut to the list of astronaut if he or she has at least
        // reached level 1. Otherwise the astronaut cannot fight and is not visible to
        // other players. This is some sort of "Noob-Protection".
        if (astronaut.level <= 0) {
            astronauts.push(astronaut);
        }
        
        // Level up the astronaut and improve it's stats a bit
        astronaut.level++;
        astronaut.health += 10;
        astronaut.mining++;
        astronaut.attack++;
        astronaut.defense++;
        
        // Emit the astronaut level up event
        emit AstronautLevelUp(msg.sender, astronaut.level);
    }
    
    /**
     * @dev Returns the cost in tokens that the next level up costs.
     */
    function getAstronautLevelUpCost() public view returns (uint) {
        Astronaut memory astronaut = ownerToAstronaut[msg.sender];
        return levelUpFactor * astronaut.level;
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
