const truffleAssert = require('truffle-assertions');
const AstronautFactory = artifacts.require("CryptoverseAstronautFactory");
const web3 = AstronautFactory.web3;

contract("Cryptoverse Astronaut Factory Test", async accounts => {

  const owner = accounts[0];
  const playerRed = accounts[1];
  const playerGreen = accounts[2];
  const playerBlue = accounts[3];

  let astronautFactory;

  beforeEach("deploy and init", async () => {
    astronautFactory = await AstronautFactory.new();
  });

  it("should start without an astronaut", async () => {
    let hasAstronaut = await astronautFactory.hasAstronaut.call({from: playerRed});
    assert.equal(hasAstronaut, false);

    const astronauts = await astronautFactory.getAstronauts.call();
    assert.equal(astronauts.length, 0);
  });

  it("should create a new astronaut", async () => {
    let hasAstronaut = await astronautFactory.hasAstronaut.call({from: playerRed});
    assert.equal(hasAstronaut, false);

    truffleAssert.eventEmitted(await astronautFactory.createAstronaut({from: playerRed}), "NewAstronaut");

    hasAstronaut = await astronautFactory.hasAstronaut.call({from: playerRed});
    assert.equal(hasAstronaut, true);

    // Other players should not have an astronaut by now though
    hasAstronaut = await astronautFactory.hasAstronaut.call({from: playerGreen});
    assert.equal(hasAstronaut, false);
  });

  it("should delete an existing astronaut", async () => {
    truffleAssert.eventEmitted(await astronautFactory.createAstronaut({from: playerRed}), "NewAstronaut");
    let hasAstronaut = await astronautFactory.hasAstronaut.call({from: playerRed});
    assert.equal(hasAstronaut, true);

    truffleAssert.eventEmitted(await astronautFactory.deleteAstronaut({from: playerRed}), "DeleteAstronaut");
    hasAstronaut = await astronautFactory.hasAstronaut.call({from: playerRed});
    assert.equal(hasAstronaut, false);
  });

  it("should throw if existing astronaut is recreate", async () => {
    await astronautFactory.createAstronaut({from: playerRed});
    let hasAstronaut = await astronautFactory.hasAstronaut.call({from: playerRed});
    assert.equal(hasAstronaut, true);
    await truffleAssert.reverts(astronautFactory.createAstronaut({from: playerRed}));
  });

  it("should throw if non-existing astronaut is deleted", async () => {
    let hasAstronaut = await astronautFactory.hasAstronaut.call({from: playerRed});
    assert.equal(hasAstronaut, false);
    await truffleAssert.reverts(astronautFactory.deleteAstronaut({from: playerRed}));
  });

  it("should only delete my astronaut", async () => {
    await astronautFactory.createAstronaut({from: playerRed});
    await truffleAssert.reverts(astronautFactory.deleteAstronaut({from: playerGreen}));
    let hasAstronaut = await astronautFactory.hasAstronaut.call({from: playerRed});
    assert.equal(hasAstronaut, true);
  });

});
