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

    event PlanetExplorerArrived(address indexed explorer, uint planetId);
    event PlanetExplorerLeft(address indexed explorer, uint planetId);
    event PlanetResourcesCollected(address indexed explorer, uint resources);

    // Players can start explorations by travelling to planets. There
    // they can mine resources which might be useful later on.
    struct Exploration {
        uint planetId;
        uint startTime;
        bool exploring;
    }

    mapping(address => Exploration) public explorations;

    uint public requiredTravelTime = 5 seconds;


    /**
     * @dev Some actions are only allowed when the player is on
     *      the surface of the planet.
     */
    modifier onlyOnPlanet() {
        require(explorations[msg.sender].exploring, "E-E1");
        _;
    }

    /**
     * @dev Leaves the planet into outer space without a specific next target.
     */
    function leavePlanet() public {
        Exploration storage exploration = explorations[msg.sender];
        Planet storage planet = planets[exploration.planetId];

        // By travelling to another planet we leave the current one
        if (planet.explorerCount > 0) {
            planet.explorerCount--;
        }

        // When did we leave the planet?
        exploration.startTime = block.timestamp;
        exploration.exploring = false;
        emit PlanetExplorerLeft(msg.sender, exploration.planetId);
    }

    /**
     * @dev Starts exploring the planets and mining from it. Before being able to explore
     *      a planet, you have to travel there for a certain amount of time.
     * @param _planetId The planet to start explore.
     */
    function explorePlanet(uint _planetId) external {
        require(isPlanet(_planetId), "E-E2");

        Exploration storage exploration = explorations[msg.sender];
        Planet storage planet = planets[_planetId];

        uint travelTime = block.timestamp - exploration.startTime;

        // This might look like a security bug here. If the exploration is not
        // initialized yet and the player just starts to explore a planet, all
        // those require statements will pass since exploring is false and
        // the start time of the journy is at 0.
        //
        // But this is actually perfectly fine here and even inteded. So to say
        // a "feature". Astronauts who just joined the game for the first time
        // and are not on the surface of any planet can immediately travel there
        // to get a first feeling for the game.
        require(!exploration.exploring, "E-E3");
        require(travelTime >= requiredTravelTime, "E-E4");

        // Start exploring this untouch and beautiful world
        planet.explorerCount++;
        exploration.planetId = _planetId;
        exploration.startTime = block.timestamp;
        exploration.exploring = true;
        emit PlanetExplorerArrived(msg.sender, _planetId);
    }

    /**
     * @dev Collects an (yet) unknown amount of resources from the planet by mining from it. You
     *      can mine as often as you wish. The gathered amount increases over time.
     */
    function collectMinedPlanetResources() external onlyOnPlanet {
        Exploration storage exploration = explorations[msg.sender];
        uint explorerOnPlanet = planets[exploration.planetId].explorerCount;
        uint explorationTime = block.timestamp - exploration.startTime;

        // Might add some really cool and sick algorithm here
        uint resourcesMinded = (explorationTime / 10) / explorerOnPlanet;

        // Reset the exploration start time
        exploration.startTime = block.timestamp;

        // Send the player the mined resources
        mint(msg.sender, resourcesMinded);
        emit PlanetResourcesCollected(msg.sender, resourcesMinded);
    }

    /**
     * @dev Returns the players active exploration.
     */
    function getMyExploration() external view returns (Exploration memory) {
        return explorations[msg.sender];
    }

    /**
     * @dev Sets the time required to travel from one planet to another one.
     * @param _requiredTravelTime Minimum required travel time to jump from one planet to another one.
     */
    function setRequiredTravelTime(uint _requiredTravelTime) external onlyOwner {
        requiredTravelTime = _requiredTravelTime;
    }

}

