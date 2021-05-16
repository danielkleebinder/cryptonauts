// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CryptoverseAstronauts.sol";
import "./CryptoversePlanets.sol";
import "./CryptoverseItems.sol";
import "./CryptoverseMath.sol";

/**
 * @title Cryptoverse Exploration System
 * @dev Players can explore the universe of "Cryptoverse". This contract handles that. This contract
 *      throws the following error codes:
 *
 *        - E-F1: The level difference is too large
 *
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
        require((opLevel - myLevel) > -10, "E-F1");
        _;
    }

    function fight(address _opponent) external canFightAgainst(_opponent) {
        Astronaut storage me = ownerToAstronaut[msg.sender];
        Astronaut storage op = ownerToAstronaut[_opponent];

        int32 dmgToMe = CryptoverseMath.max(int32(me.defense) - int32(op.attack), 1);
        int32 dmgToOp = CryptoverseMath.max(int32(op.defense) - int32(me.attack), 1);

        // Will never be below zero, so this type cast is safe
        me.health = uint32(CryptoverseMath.max(int32(me.health) - dmgToMe, 0));
        op.health = uint32(CryptoverseMath.max(int32(op.health) - dmgToOp, 0));

        // I lost, increase counters and heal me back up again (I respawned)
        if (me.health <= 0) {
            me.lossCount++;
            op.winCount++;
            me.health = me.baseHealth;
        }

        // I won, increase counters and heal my opponent back up again
        if (op.health <= 0) {
            me.winCount++;
            op.lossCount++;
            op.health = op.baseHealth;
        }
    }
}
