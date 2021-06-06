// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CryptoverseAstronauts.sol";
import "./CryptoversePlanets.sol";
import "./CryptoverseItems.sol";
import "./CryptoverseMath.sol";

/**
 * @title Cryptoverse Combat System
 * @dev Players can fight other players. This contract handles that. Be aware that combat
 *      is purposelly fully predictable. Randomness is quite difficult to achive in Solidity
 *      and I don't like game that include (too much) randomness anyways. This contract throws
 *      the following error codes:
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
     * @param _opponent The opponent players address.
     */
    modifier canFightAgainst(address _opponent) {
        int32 myLevel = int32(ownerToAstronaut[msg.sender].level);
        int32 opLevel = int32(ownerToAstronaut[_opponent].level);
        require(opLevel > 0 && myLevel > 0, "E-F1");
        require((opLevel + 10) > myLevel, "E-F2");
        require(msg.sender != _opponent, "E-F3");
        _;
    }

    /**
     * @dev Players can fight other players using this function. It is important to notice
     *      that players have to be within a certain level range to fight each other. If one
     *      player wins over another, a certain amount of tokens are dropped by one player
     *      and automatically looted by another one.
     * @param _opponent Opponents address.
     */
    function fight(address _opponent) external canFightAgainst(_opponent) {
        Astronaut storage me = ownerToAstronaut[msg.sender];
        Astronaut storage op = ownerToAstronaut[_opponent];

        int32 dmgToMe = CryptoverseMath.max(int32(op.attack) - int32(me.defense), 1);
        int32 dmgToOp = CryptoverseMath.max(int32(me.attack) - int32(op.defense), 1);

        // Will never be below zero, so this type cast is safe
        me.health = uint32(CryptoverseMath.max(int32(me.health) - dmgToMe, 0));
        op.health = uint32(CryptoverseMath.max(int32(op.health) - dmgToOp, 0));

        // I lost, increase counters and heal me back up again (I respawn)
        if (me.health <= 0) {
            fightEnded(_opponent, msg.sender);
        }

        // I won, increase counters and heal my opponent back up again
        if (op.health <= 0) {
            fightEnded(msg.sender, _opponent);
        }

        // Notify the players that the battle is now over
        emit CombatOver(msg.sender, _opponent);
    }

    /**
     * @dev Internal function that handles the outcome of a battle.
     * @param _winner Winners address.
     * @param _loser Losers address.
     */
    function fightEnded(address _winner, address _loser) internal {
        Astronaut storage winner = ownerToAstronaut[_winner];
        Astronaut storage loser = ownerToAstronaut[_loser];

        // Change the players stats accordingly
        winner.winCount++;
        loser.lossCount++;
        loser.health = loser.baseHealth;

        // The loser drops 5% of the tokens and the winner collects them as reward
        uint droppedTokens = balanceOf(_loser) / 20;

        // It only makes sense to drop and collect tokens if the loser even has
        // something to drop.
        if (droppedTokens > 0) {
            _burn(_loser, droppedTokens);
            mint(_winner, droppedTokens);
        }
    }
}
