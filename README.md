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

| Work Packet           | Time |
|-----------------------|------|
| Game Idea             | 4h   |
| Frontend              | 9h   |
| Contracts             | 9h 30m   |
| Testing               | 3h 30m   |
| Connecting FE & SC    | 4h   |
| **Total**             | **29h** |


Difficulties
------------
TODO - What difficulties did you face during development?

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

