// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CryptoverseAstronauts.sol";
import "./CryptoversePlanets.sol";
import "./CryptoverseItems.sol";

/**
 * @title Cryptoverse Exploration System
 * @dev Players can explore the universe of "Cryptoverse". This contract handles that.
 */
contract CryptoverseExploration is CryptoversePlanets, CryptoverseAstronauts, CryptoverseItems {

    event PlanetExplorerArrived(address explorer, uint planetId);
    event PlanetResourcesCollected(address explorer, uint resources);

    // Players can start explorations by travelling to planets. There
    // they can mine resources which might be useful later on.
    struct Exploration {
        uint planetId;
        uint startTime;
        bool onTheSurface;
    }

    mapping(uint => uint) explorerCount;
    mapping(address => Exploration) explorations;
    
    
    /**
     * @dev Some actions are only allowed when the player is on
     *      the surface of the planet.
     */
    modifier onlyOnPlanet() {
        require(explorations[msg.sender].onTheSurface, "This is only possible on the surface of a planet");
        _;
    }
    
    /**
     * @dev Start travelling to another specified planet.
     */
    function travelToPlanet(uint _planetId) external {
        require(isPlanet(_planetId), "This is not a planet");
        
        // Leave the current planet (if on one) and travel to the next one
        leavePlanet();
        explorations[msg.sender].planetId = _planetId;
    }
    
    function leavePlanet() public {
        Exploration storage exploration = explorations[msg.sender];
        
        // By travelling to another planet we leave the current one
        if (explorerCount[exploration.planetId] > 0) {
            explorerCount[exploration.planetId]--;
        }
        
        // When did we leave the planet?
        exploration.startTime = block.timestamp;
        exploration.onTheSurface = false;
    }
    
    function explorePlanet(uint _planetId) external {
        require(isPlanet(_planetId), "This is not a planet");
        
        Exploration storage exploration = explorations[msg.sender];
        uint travelTime = block.timestamp - exploration.startTime;
        
        // This might look like a security bug here. If the exploration is not
        // initialized yet and the player just starts to explore a planet, all
        // those require statements will pass since onTheSurface is false and
        // the start time of the journy is at 0.
        //
        // But this is actually perfectly fine here and even inteded. So to say
        // a "feature". Astronauts who just joined the game for the first time
        // and are not on the surface of any planet can immediately travel there
        // to get a first feeling for the game.
        require(!exploration.onTheSurface, "You are already exploring");
        require(travelTime > 5 seconds, "You are still traveling to this planet");
        
        // Start exploring this untouch and beautiful world
        explorerCount[_planetId]++;
        exploration.planetId = _planetId;
        exploration.startTime = block.timestamp;
        exploration.onTheSurface = true;
        emit PlanetExplorerArrived(msg.sender, _planetId);
    }
    
    function collectMinedPlanetResources() external onlyOnPlanet {
        Exploration storage exploration = explorations[msg.sender];
        uint explorerOnPlanet = explorerCount[exploration.planetId];
        uint explorationTime = block.timestamp - exploration.startTime;
        
        // Might add some really cool and sick algorithm here
        uint resourcesMinded = (explorationTime / 10) / explorerOnPlanet;
        
        // Reset the exploration start time
        exploration.startTime = block.timestamp;
        
        // Send the player the mined resources
        mint(msg.sender, resourcesMinded);
        emit PlanetResourcesCollected(msg.sender, resourcesMinded);
    }
    
}

