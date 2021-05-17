// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CryptoverseAstronauts.sol";
import "./CryptoversePlanets.sol";
import "./CryptoverseItems.sol";
import "./CryptoverseMath.sol";

/**
 * @title Cryptoverse Combat System
 * @dev Players can fight other players. This contract handles that. This contract
 *      throws the following error codes:
 *
 *        - E-F1: You and your opponent must be at least level 1 to fight each other
 *        - E-F2: The level difference is too large
 *        - E-F3: You cannot fight against yourself
 *
 */
contract CryptoverseCombat is CryptoverseAstronauts, CryptoverseItems {

    event CombatOver(address challenger, address opponent);


    /**
     * @dev Players can only fight other players in their level range. There is no
     *      upper bound for stronger opponents, but there is one for opponents that
     *      are weaker than you.
     */
    modifier canFightAgainst(address _opponent) {
        int32 myLevel = int32(ownerToAstronaut[msg.sender].level);
        int32 opLevel = int32(ownerToAstronaut[_opponent].level);
        require(opLevel > 0 && myLevel > 0, "E-F1");
        require((opLevel - myLevel) > -10, "E-F2");
        require(msg.sender != _opponent, "E-F3");
        _;
    }

    function fight(address _opponent) external canFightAgainst(_opponent) {
        Astronaut storage me = ownerToAstronaut[msg.sender];
        Astronaut storage op = ownerToAstronaut[_opponent];

        int32 dmgToMe = CryptoverseMath.max(int32(op.attack) - int32(me.defense), 1);
        int32 dmgToOp = CryptoverseMath.max(int32(me.attack) - int32(op.defense), 1);

        // Will never be below zero, so this type cast is safe
        me.health = uint32(CryptoverseMath.max(int32(me.health) - dmgToMe, 0));
        op.health = uint32(CryptoverseMath.max(int32(op.health) - dmgToOp, 0));

        // I lost, increase counters and heal me back up again (I respawned)
        if (me.health <= 0) {
            me.lossCount++;
            op.winCount++;
            me.health = me.baseHealth;
            dropLoot(msg.sender, _opponent);
        }

        // I won, increase counters and heal my opponent back up again
        if (op.health <= 0) {
            me.winCount++;
            op.lossCount++;
            op.health = op.baseHealth;
            dropLoot(_opponent, msg.sender);
        }

        // Notify the players that the battle is now over
        emit CombatOver(msg.sender, _opponent);
    }

    /**
     * @dev Internal function which simulates dropping some tokens as loot for the
     *      winner of a battle.
     * @param _loser  The battles loser.
     * @param _winner The battles winner.
     */
    function dropLoot(address _loser, address _winner) internal {
        uint droppedTokens = balanceOf(_loser) / 20;
        _burn(_loser, droppedTokens);
        mint(_winner, droppedTokens);
    }
}
