My Final Project
================

### Deadline: Mon, 14 June 2021, 23:55

Topic
---------
Choose a topic to your liking for your own project.
If you have no preference for any topic, you may build on the TU beer bar by either replacing parts and/or extending the existing project. 
This could be a pub quiz, an extended beer supply, or an extended voting board for example.

Grading
---------
We consider the following aspects:
- Documentation: Provide the documentation of your project by completing the project details in the README.md on git. Add further files as necessary.
- Complexity: The project should be non-trivial. Rather, it should make use of mappings, roles with RBAC, modifiers, Ether, and tokens when reasonable. Moreover, it should provide a simple web interface for interaction with the contract.
- Correctness: The project should use correct math (big numbers, overflow), include test cases and ensure that neither any ether nor any tokens are lost.
- Security: Try to avoid that the contract can be depleted by any method used in the challenges.
- Originality: We would like your projects to be distinguishable from reproductions, clones, forgeries, or derivative works. On a side note: we've already seen too many casinos.

We place less value on a fancy WebUI, as it is not part of the LVA.

Your project is complex enough if 40 hours of effort are understandable for us.


Submission and Presentation
---------
Submit your project on your `master` branch on git.sc.logic.at and present it in the online review session on Thu, 17.06.2021. 
Reserve a time slot via Tuwel.

---------------------------

Project details
===============

Addresses
---------
TODO - Write here on which addresses you have deployed the contracts on the LVAChain:

Description
-----------
TODO - A description of your project...

Implementation
--------------
TODO - Write about your implementation here...

Effort breakdown
------------------
TODO - Short breakdown of your work distribution (approx. 40h effort)...

| Work Packet            | Time |
|------------------------|------|
| Game Idea              | 4h   |
| Frontend               | 12h  |
| Contracts              | 25h  |
| Testing                | 6h   |
| Web3 (connect FE & SC) | 6h   |
| Documentation          | 1h   |
| **Total**              | **54h** |


Difficulties
------------
TODO - What difficulties did you face during development?

Solidity has certain constraints placed upon us developers. The most annoying one certainly was the 24 kB contract size limit. The Cryptoverse could probably be split into multiple smaller contacts, but that would come at a certain management cost. It also wasn't obvious HOW to split it.

I thought about extracting the tokens contract from the main one, but this is also barely possible and would come at great cost of extending the token contract by a quite excessive amount of code. This is due to the fact, that the Cryptoverse contract needs more than just minter access to the token contract. It needs full administrative rights like burning tokens of certain users or being able to transfer tokens from one to another user solely on its own for example.

Using delegate calls for this task would have placed more security issues on both of the contracts than they would benefit. So this option also fell flat. However, I was able to reduce the contracts size by using the optimizer flag on the compiler, remove all unnecessary boilerplate code (like getter if a property could be public instead) and replace all revert error messages with simple and short error codes.

Also the astronauts contract gave me some headache: I did not want to initialize the astronauts per player with any function (which the users of the contract must invoked before playing the game - that would have been quite annoying), so I simply decided to make this constraint a feature of my game.

New players now start with a level 0 cryptonaut. They are not part of the global cryptonauts array and can therefore not be address by other players. So level 0 cryptonauts are implicitly protected by some sort of "noob shield". Only if they level up their cryptonaut, they can participate in fights and mining.

One of the biggest challenges was the item system. It has quite a lot of funcionality and affects the player in a wide area. I struggled to figure out how to add the stats that an item gives to the players stats. First I tried to use some sort of for loop and add the accumulated stats to the players stats, but this would become insanely expensive for transactions that cost actual gas.

In the end I figured out, that I can implement an "equipment" system. Players actually have to equip an item to profit from its stats. If equipped, the stats will be directly added to the players stats now. This has many advantages:

 - I can easily perform actions using the players real stats with the equipment active on this player
 - Getting the players total stats is very cost effcicient now
 - The total stats can be directly shown in the players menu in the game

However, implementing this system also came at a cost. Players cannot destroy or upgrade items if equipped. This makes a lot of sense however and it became a quite cool feature of the game now.

Proposal for future changes
---------------------------
TODO - Do you have any proposal how we could change this exercise in the future? 
(can be left empty)

---------------------------

HOWTO
=====
Run `npm install` to install all dependencies.

This repository contains an initialized Truffle project.

Recommended web3.js version: v1.3.4

Truffle
-------
Implement your contracts in the `contracts/` folder.

Implement your test cases in the `tests/` folder.
You can run them with `npm run truffle test`.

With `npm run truffle develop` you can start a local truffle development chain.

You can deploy the project to the LVAChain via `npm run truffle deploy -- --network=prod` (requires running `geth` client).
If you use roles, please make us - the person at `addresses.getPublic(4)` - an owner/admin of the contract.

Web interface
-------------
You are free to implement your web interface via static JavaScript files (similar to the BeerBar),
or to use any suitable framework (like [React](https://reactjs.org/), [Angular](https://angular.io/), [Vue](https://vuejs.org/), or [Drizzle-React](https://github.com/trufflesuite/drizzle-react)).

If you use only static content, put your files into the `public/` folder.   
You can run a local webserver with `npm run serve`.  

If you use another framework, you will need to adjust the `build` command in `package.json`. Follow the documentation of your framework for doing so.
You can e.g. use `webpack` to compile your files, and copy the output into the `public/` folder.

The content of your `public/` folder will also be available via the URL <https://final.pages.sc.logic.at/e51832684>.

