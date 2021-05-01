const truffleAssert = require('truffle-assertions');
const AstronautsContract = artifacts.require("CryptoverseAstronauts");
const web3 = AstronautsContract.web3;

contract("Cryptoverse Astronauts Test", async accounts => {

  const owner = accounts[0];
  const playerRed = accounts[1];
  const playerGreen = accounts[2];
  const playerBlue = accounts[3];

  let astronautsInstance;

  beforeEach("deploy and init", async () => {
    astronautsInstance = await AstronautsContract.new();
  });

  it("should start with a level 0 astronaut", async () => {
    const me = await astronautsInstance.getAstronaut.call();
    assert.equal(me.level, 0);
  })

  it("should return 0 level up cost for level 0", async () => {
    const cost = (await astronautsInstance.getAstronautLevelUpCost.call()).toNumber();
    assert.equal(cost, 0);
  });

  it("should start with 0 astronauts", async () => {
    const astronauts = await astronautsInstance.getAstronauts.call();
    assert.equal(astronauts.length, 0);
  });

  it("should level up astronaut to level 1 without cost", async () => {
    truffleAssert.eventEmitted(await astronautsInstance.levelUpAstronaut({from: playerRed}), "AstronautLevelUp");

    // Astronaut has to be level 1 now
    const me = await astronautsInstance.getAstronaut.call({from: playerRed});
    assert.equal(me.level, 1);

    // Level up cost must increase
    const cost = (await astronautsInstance.getAstronautLevelUpCost.call({from: playerRed})).toNumber();
    assert(cost > 0);
  });

  it("should throw if level up cost is too high", async () => {
    truffleAssert.eventEmitted(await astronautsInstance.levelUpAstronaut({from: playerRed}), "AstronautLevelUp");
    await truffleAssert.reverts(astronautsInstance.levelUpAstronaut({from: playerRed}));
  });

  it("should change level up cost depending on level up factor", async () => {
    await astronautsInstance.levelUpAstronaut({from: playerRed});
    await astronautsInstance.setLevelUpFactor(10);
    const cost1 = (await astronautsInstance.getAstronautLevelUpCost.call({from: playerRed})).toNumber();
    await astronautsInstance.setLevelUpFactor(20);
    const cost2 = (await astronautsInstance.getAstronautLevelUpCost.call({from: playerRed})).toNumber();
    assert.notEqual(cost1, cost2);
  });

  it("should expose astronauts after becoming level 1", async () => {
    let astronauts = await astronautsInstance.getAstronauts.call();
    assert.equal(astronauts.length, 0);

    await astronautsInstance.levelUpAstronaut({from: playerRed});

    astronauts = await astronautsInstance.getAstronauts.call();
    assert.equal(astronauts.length, 1);
  });

  it("should burn tokens according to the level up cost", async () => {
    await astronautsInstance.mint(playerRed, 100);

    await astronautsInstance.levelUpAstronaut({from: playerRed});
    const balanceBeforeLevelUp = (await astronautsInstance.balanceOf.call(playerRed)).toNumber();

    const cost = (await astronautsInstance.getAstronautLevelUpCost.call({from: playerRed})).toNumber();

    await astronautsInstance.levelUpAstronaut({from: playerRed});
    const balanceAfterLevelUp = (await astronautsInstance.balanceOf.call(playerRed)).toNumber();

    assert.notEqual(balanceBeforeLevelUp, balanceAfterLevelUp);
    assert.equal(balanceBeforeLevelUp, 100);
    assert.equal(balanceAfterLevelUp, (100 - cost));
  });

  it("should increase level up cost with every level", async () => {
    await astronautsInstance.mint(playerRed, 1000);

    let previousCost, cost;

    previousCost = (await astronautsInstance.getAstronautLevelUpCost.call({from: playerRed})).toNumber();
    await astronautsInstance.levelUpAstronaut({from: playerRed});
    cost = (await astronautsInstance.getAstronautLevelUpCost.call({from: playerRed})).toNumber();
    assert(previousCost < cost);

    previousCost = cost;
    await astronautsInstance.levelUpAstronaut({from: playerRed});
    cost = (await astronautsInstance.getAstronautLevelUpCost.call({from: playerRed})).toNumber();
    assert(previousCost < cost);

    previousCost = cost;
    await astronautsInstance.levelUpAstronaut({from: playerRed});
    cost = (await astronautsInstance.getAstronautLevelUpCost.call({from: playerRed})).toNumber();
    assert(previousCost < cost);
  });

});
