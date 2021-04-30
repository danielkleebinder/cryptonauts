// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CryptoverseAstronautFactory.sol";

/**
 * @title Cryptoverse Planet System
 * @dev The cryptoverse planet system manages all available planets.
 */
contract CryptoversePlanetFactory is CryptoverseAstronautFactory {
    
    event NewPlanet(uint planetId);
    event DestroyPlanet(uint planetId);
    
    // Planets are the fundamental building block of my system. They
    // consist of different properties which makes each of the unique.
    // Those parameters provided here are typically enough to calculate
    // other properties like surface gravity for example.
    struct Planet {
        
        // A (unique) planetary identifier
        uint id;
        
        // The planets name. This is also used by the client to select
        // which image to use to render the planet.
        string name;
        
        // The age of the planet in years
        uint64 age;
        
        // The radius of the planet in meters
        uint32 radius;
        
        // The average surface temperature in degrees celcius
        uint32 temperature;
        
        // The mass of the planet in kilograms
        uint256 mass;
    }
    
    Planet[] public planets;
    
    
    constructor() {
        // The standard planets are hard coded
        createPlanet("Crypton", 1_438_847_005, 5_745_932, 10, 2_503 * (10 ** 21));
        createPlanet("Etherra", 2_840_381_101, 7_212_387, 23, 9_195 * (10 ** 21));
    }
    
    
    /**
     * @dev Creates an entirely new planet. This can only be done by the contracts owner.
     * @param _name         The planets name.
     * @param _age          The planets age in years.
     * @param _radius       The planets radius in meters.
     * @param _temperature  The planets average surface temperature.
     * @param _mass         The planets mass in kilograms.
     */
    function createPlanet(string memory _name, uint64 _age, uint32 _radius, uint32 _temperature, uint256 _mass) public onlyOwner {
        uint id = planets.length;
        planets.push(Planet(id, _name, _age, _radius, _temperature, _mass));
        emit NewPlanet(id);
    }
    
    /**
     * @dev Returns all planets currently stored in this contract.
     */
    function getPlanets() external view returns (Planet[] memory) {
        return planets;
    }
    
    /**
     * @dev Completely destroys a planet. This can only be done by the contracts owner.
     * @param _planetId The ID of the planet which should be destroyed.
     */
    function destroyPlanet(uint _planetId) public onlyOwner {
        delete planets[_planetId];
        emit DestroyPlanet(_planetId);
    }
}
