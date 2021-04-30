// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Cryptoverse.sol";

/**
 * @title Cryptoverse Planet System
 * @dev The cryptoverse planet system manages all available planets.
 */
contract CryptoverseAstronautFactory is Cryptoverse {
    
    event NewAstronaut(address indexed player, uint astronautId);
    event DeleteAstronaut(address indexed player, uint astronautId);
    
    // Astronauts are the players characters used in my game. It is important to
    // notice that each player can only have one astronaut.
    struct Astronaut {
        
        // A (unique) astronaut identifier
        uint id;
        
        // The astronauts level
        uint32 level;
    }
    
    Astronaut[] public astronauts;
    mapping(address => Astronaut) playerToAstronaut;
    
    
    /**
     * @dev Checks if the player has an astronaut.
     */
    modifier onlyAstronaut() {
        require(hasAstronaut(), "You do not have an astronaut yet");
        _;
    }
    
    /**
     * @dev Checks if the player does not have an astronaut yet.
     */
    modifier hasNoAstronaut() {
        require(!hasAstronaut(), "Delete your astronaut before calling this action");
        _;
    }
    
    /**
     * @dev Creates a new astronaut for the msg.sender. Be cautious: If you already have an
     *      astronaut, you have to delete your old one before being able to create a new one.
     */
    function createAstronaut() external hasNoAstronaut {
        uint id = astronauts.length;
        astronauts.push(Astronaut(id, 1));
        playerToAstronaut[msg.sender] = astronauts[id];
        emit NewAstronaut(msg.sender, id);
    }
    
    /**
     * @dev Returns all astronauts currently stored in this contract.
     */
    function getAstronauts() external view returns (Astronaut[] memory) {
        return astronauts;
    }
    
    /**
     * @dev Deletes the astronaut of the player sending the request. This function can only
     *      be used if the player has an astronaut.
     */
    function deleteAstronaut() external onlyAstronaut {
        Astronaut memory me = playerToAstronaut[msg.sender];
        delete astronauts[me.id];
        delete playerToAstronaut[msg.sender];
        emit DeleteAstronaut(msg.sender, me.id);
    }
    
    /**
     * @dev Tests if the msg.sender has an astronaut. Returns true if so,
     *      otherwise false. Astronauts cannot be level 0. The min level is
     *      1. This fact is used here to check if the msg.sender already has
     *      an astronaut or not.
     */
    function hasAstronaut() public view returns (bool) {
        return playerToAstronaut[msg.sender].level > 0;
    }
}
