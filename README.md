Cryptonauts
================

Cryptonauts is a game which was developed during the course of Smart Contracts in the summer term 2021 at TU Vienna. The game
is based on Solidity (the Smart Contract programming language of [Ethereum - the global decentralized blockchain](https://ethereum.org/)). It
is a game about your personal astronaut that resides in the Cryptoverse. Your cryptonaut has a certain level and can improve
on its skills over time.

![Yes, that's you](https://github.com/danielkleebinder/cryptonauts/blob/main/preview/2.PNG?raw=true)

The entire game is based around a crypto token called "space diamonds" that can be mined on planets over time, bought
using Ether or "stolen" from other Cryptonauts playing the game when you win a fight. Leveling up your cryptonaut can
make it easier for you to specialize in one certain area but might weaken you in others. For example: you can specialize
in mining space diamonds from planets, but neglect your combat abilities which will obviously make you an easier target
for hostile players.

Another important aspect of the game is the "Spacemarket". It's ran by a guy called "Mr. Goodes". He sells items that
game administrators can add to the game. These items also increase your cryptonauts stats and can be improved in your
inventory for space diamonds. Some of those items are really powerful but also quite expensive. You should also be
aware that you cannot equip more than a given amount of items at a time.

![Hello Mr. Goodes](https://github.com/danielkleebinder/cryptonauts/blob/main/preview/4.PNG?raw=true)

Mining resources from planets can be very very lucrative as well. But be aware, that you can only mine from planets
after your cryptonaut reached level 1 at least. The more players that are currently exploring a planet, the less lucrative
your explorations will be. So try hopping from one planet to another one from time to time, but be aware that traveling
between planets also takes time (who would have known that space travel is time-consuming, right? ;-)

![Crypton and Etherra](https://github.com/danielkleebinder/cryptonauts/blob/main/preview/3.PNG?raw=true)

Last but not least, there is the leaderboard. In the leaderboard, you can filter for players in your level range for
example. The leaderboard is also used as a place for combat. You can fight other players there and steal their space
diamonds.

![Your Inventory](https://github.com/danielkleebinder/cryptonauts/blob/main/preview/5.PNG?raw=true)

The goal of the game is quite simple. Become the very best. Try to level up your cryptonaut and improve your skills
to become the number one on the leaderboard.


Implementation
--------------
This game uses Solidity 0.8.0 and the Angular framework in version 12 as well as the Angular Redux store (NgRx) to implement
the frontend.

As an upfront note: The game was designed to be entirely deterministic. There is no randomness involved at all. All players
have the exact same opportunities when they first join the Cryptoverse.

Since the game is built all around the space diamonds, I had to use some sort of token based contract. This, however, wasn't
by far as easy as expected since the game contract itself has to do a lot of transactions from within the contract. Therefore,
I used a reduced version of the "ERC223" token specification. The cryptoverse contract implements some of the functions specified,
but by far not all of them. This is to stay away from unnecessary complexity and reduce the size of the contract.

The game also possesses an ownership system. The deployer of the contract is the first owner. Owners can add other owners. Owners
do have special rights. They can collect the Ether stored on the contract, they can set a token price, they can adjust some
balancing parameters of the game, add new items to the game and so on. Implemented was this using the OpenZeppelin Roles model
(https://github.com/hiddentao/openzeppelin-solidity/blob/master/contracts/access/Roles.sol).

Planets are probably the simplest part of the entire contract. They reside in an array and are created when the contract is
created. At the moment, it is not possible to add more planets when the contract was already deployed. This is just a minor
contraint to at least somewhat keep the time frame but it is open for extension in latter versions of the game of course. This
would probably also include setting up a backend server which saves the planet images and their description (nothing I should
do in the smart contract).

Planets can also be explored. This was implemented using simple structs where each player has his or her own exploration that
is currently going on or not.

Since all players must have a list of all other players to be able to fight them, I had to use some sort of array to store
all players addresses and a mapping that maps the players to their astronauts. This was problematic however, since I could
not access level 0 players that just joined the game. So I decided that this shortcoming of Solidity will be a powerful
feature for my game. Level 0 players cannot attack or be attacked by other players. This is a beginners protection mechanism
intrinsic to the smart contract architecture of the game.

Only if you level up your cryptonaut, it will be added to the list of players. This is an idea I am actually quite proud of haha

With items, I faced a similar problem. I somehow had to sum up all the stats of the player and the items owned by this player. This
would be incredibly expensive gas-wise if I just iterate over all items and check its owner for transactions like fights or
mining. So I came up with the idea of equipping items. If a player equips or unequips an item, the items stats are directly
added to the players stats in their struct.

This allows me to show the cumulated stats to the players and directly use the total stats in all kinds of transactions and be
most cost-efficient.

Very interesting was also the usage of require error codes that I had to implement due to the size constraints of smart
contracts. They are all translated by the frontend.


Effort breakdown
----------------
The table below shows the effort I put into certain work packets:

| Work Packet            | Time |
|------------------------|------|
| Game Idea              | 4h   |
| Frontend               | 16h  |
| Contracts              | 27h  |
| Testing                | 6h   |
| Web3 (connect FE & SC) | 6h   |
| Documentation          | 2h   |
| **Total**              | **61h** |


Difficulties
------------
Solidity has certain constraints placed upon us developers. The most annoying one certainly was the 24 kB contract size
limit. The Cryptoverse could probably be split into multiple smaller contacts, but that would come at a certain management
cost. It also wasn't obvious HOW to split it.

I thought about extracting the tokens contract from the main one, but this is also barely possible and would come at great
cost of extending the token contract by a quite excessive amount of code. This is due to the fact, that the Cryptoverse
contract needs more than just minter access to the token contract. It needs full administrative rights like burning tokens
of certain users or being able to transfer tokens from one to another user solely on its own for example.

Using delegate calls for this task would have placed more security issues on both of the contracts than they would benefit.
So this option also fell flat. However, I was able to reduce the contracts size by using the optimizer flag on the compiler,
remove all unnecessary boilerplate code (like getter if a property could be public instead) and replace all revert error
messages with simple and short error codes.

Also the astronauts contract gave me some headache: I did not want to initialize the astronauts per player with any function
(which the users of the contract must invoked before playing the game - that would have been quite annoying), so I simply
decided to make this constraint a feature of my game.

New players now start with a level 0 cryptonaut. They are not part of the global cryptonauts array and can therefore not
be address by other players. So level 0 cryptonauts are implicitly protected by some sort of "noob shield". Only if they
level up their cryptonaut, they can participate in fights and mining.

One of the biggest challenges was the item system. It has quite a lot of funcionality and affects the player in a wide
area. I struggled to figure out how to add the stats that an item gives to the players stats. First I tried to use some
sort of for loop and add the accumulated stats to the players stats, but this would become insanely expensive for
transactions that cost actual gas.

In the end I figured out, that I can implement an "equipment" system. Players actually have to equip an item to profit
from its stats. If equipped, the stats will be directly added to the players stats now. This has many advantages:

 - I can easily perform actions using the players real stats with the equipment active on this player
 - Getting the players total stats is very cost effcicient now
 - The total stats can be directly shown in the players menu in the game

However, implementing this system also came at a cost. Players cannot destroy or upgrade items if equipped. This makes a
lot of sense however and it became a quite cool feature of the game now.


HOWTO
=====
Run `npm install` to install all dependencies.

This repository contains an initialized Truffle project.


Truffle
-------
You can run the tests with `npm run truffle test`.

With `npm run truffle develop` you can start a local truffle development chain.

You can deploy the project on your local chain via `npm run truffle deploy -- --network=local`.
