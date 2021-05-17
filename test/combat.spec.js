const truffleAssert = require('truffle-assertions');
const CombatContract = artifacts.require("CryptoverseCombat");
const web3 = CombatContract.web3;

contract("Cryptoverse Combat", async accounts => {

  const owner = accounts[0];
  const playerRed = accounts[1];
  const playerGreen = accounts[2];
  const playerBlue = accounts[3];

  let combatInstance;

  beforeEach("deploy and init", async () => {
    combatInstance = await CombatContract.new();
  });

  it("should throw if level 0 players want to fight", async () => {
    const red = await combatInstance.getMyAstronaut.call({from: playerRed});
    const green = await combatInstance.getMyAstronaut.call({from: playerGreen});

    assert.equal(red.level, 0);
    assert.equal(green.level, 0);

    await truffleAssert.reverts(combatInstance.fight(playerGreen, {from: playerRed}));
  });

  it("should throw if level difference is too high", async () => {
    await combatInstance.setLevelUpFactor(1);
    await combatInstance.levelUpAstronaut("mining", {from: playerGreen});
    await combatInstance.buyTokens({from: playerRed, value: 1000000});

    const levelUpRequests = [];
    for (let i = 0; i < 12; i++) {
      levelUpRequests.push(combatInstance.levelUpAstronaut("mining", {from: playerRed}));
    }

    await Promise.all(levelUpRequests);
    await truffleAssert.reverts(combatInstance.fight(playerGreen, {from: playerRed}));
  });

  it("should throw if player wants to fight level 0 opponent", async () => {
    await combatInstance.levelUpAstronaut("mining", {from: playerGreen});

    const red = await combatInstance.getMyAstronaut.call({from: playerRed});
    const green = await combatInstance.getMyAstronaut.call({from: playerGreen});

    assert.equal(red.level, 0);
    assert.equal(green.level, 1);

    await truffleAssert.reverts(combatInstance.fight(playerRed, {from: playerGreen}));
  });

  it("should throw if player wants to fight against himself", async () => {
    await combatInstance.levelUpAstronaut("attack", {from: playerGreen});
    await truffleAssert.reverts(combatInstance.fight(playerGreen, {from: playerGreen}));
  });

  it("should reduce health after battle", async () => {
    await combatInstance.levelUpAstronaut("mining", {from: playerRed});
    await combatInstance.levelUpAstronaut("mining", {from: playerGreen});

    const redBefore = await combatInstance.getMyAstronaut.call({from: playerRed});
    const greenBefore = await combatInstance.getMyAstronaut.call({from: playerGreen});

    truffleAssert.eventEmitted(await combatInstance.fight(playerGreen, {from: playerRed}), "CombatOver");

    const redAfter = await combatInstance.getMyAstronaut.call({from: playerRed});
    const greenAfter = await combatInstance.getMyAstronaut.call({from: playerGreen});

    assert((+redBefore.health) > (+redAfter.health));
    assert((+greenBefore.health) > (+greenAfter.health));
  });

  it("should increase win and loss count accordingly", async () => {
    await combatInstance.levelUpAstronaut("attack", {from: playerRed});
    await combatInstance.levelUpAstronaut("mining", {from: playerGreen});

    const red = await combatInstance.getMyAstronaut.call({from: playerRed});
    const green = await combatInstance.getMyAstronaut.call({from: playerGreen});

    const fightRequests = [];
    for (let i = 0; i < Math.ceil(green.health / (red.attack - green.defense)); i++) {
      fightRequests.push(combatInstance.fight(playerGreen, {from: playerRed}));
    }

    await Promise.all(fightRequests);

    const redAfter = await combatInstance.getMyAstronaut.call({from: playerRed});
    const greenAfter = await combatInstance.getMyAstronaut.call({from: playerGreen});

    // Red won
    assert((+redAfter.winCount) > (+red.winCount));
    assert.equal(+redAfter.lossCount, +red.lossCount);

    // Green lost
    assert.equal(+greenAfter.winCount, +green.winCount);
    assert((+greenAfter.lossCount) > (+green.lossCount));
  });

});
