// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CryptoverseAstronauts.sol";
import "./CryptoversePlanets.sol";
import "./CryptoverseItems.sol";
import "./CryptoverseMath.sol";

/**
 * @title Cryptoverse Exploration System
 * @dev Players can explore the universe of "Cryptoverse". This contract handles that.
 */
contract CryptoverseFights is CryptoverseAstronauts, CryptoverseItems {
    
    /**
     * @dev Players can only fight other players in their level range. There is no
     *      upper bound for stronger opponents, but there is one for opponents that
     *      are weaker than you.
     */
    modifier canFightAgainst(address _opponent) {
        int32 myLevel = int32(ownerToAstronaut[msg.sender].level);
        int32 opLevel = int32(ownerToAstronaut[_opponent].level);
        require((opLevel - myLevel) > -10);
        _;
    }
    
    function fight(address _opponent) external {
        Astronaut storage me = ownerToAstronaut[msg.sender];
        Astronaut storage op = ownerToAstronaut[_opponent];
        
        (uint myAtt, uint myDef) = getTotalPlayerStats(msg.sender);
        (uint opAtt, uint opDef) = getTotalPlayerStats(_opponent);
        
        int dmgToMe = CryptoverseMath.max(int(myDef) - int(opAtt), 1);
        int dmgToOp = CryptoverseMath.max(int(opDef) - int(myAtt), 1);
        
        if (dmgToMe > dmgToOp) {
            me.lossCount++;
            op.winCount++;
        } else if (dmgToMe < dmgToOp) {
            me.winCount++;
            op.lossCount++;
        }
    }
    
    function getTotalPlayerStats(address _player) public view returns (uint attack, uint defense) {
        Astronaut memory astronaut = ownerToAstronaut[_player];
        Item[] memory playerItems = getItemsByOwner(_player);
        Item memory item;
        for (uint i = 0; i < playerItems.length; i++) {
          item = items[i];
          attack += item.attack;
          defense += item.defense;
        }
        attack += astronaut.attack;
        defense += astronaut.defense;
        return (attack, defense);
    }
    
}