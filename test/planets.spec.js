const truffleAssert = require('truffle-assertions');
const PlanetFactory = artifacts.require("CryptoversePlanetFactory");
const web3 = PlanetFactory.web3;

contract("Cryptoverse Planet Factory Test", async accounts => {

  const owner = accounts[0];
  const playerRed = accounts[1];
  const playerGreen = accounts[2];
  const playerBlue = accounts[3];

  let planetFactory;

  beforeEach("deploy and init", async () => {
    planetFactory = await PlanetFactory.new();
  });

  it("should create the default planets", async () => {
    const planets = await planetFactory.getPlanets.call();
    assert.equal(planets.length, 2);
    assert.equal(planets[0].name, "Crypton");
    assert.equal(planets[1].name, "Etherra");
  });

  it("should destroy a planet", async () => {
    let planets = await planetFactory.getPlanets.call();
    truffleAssert.eventEmitted(await planetFactory.destroyPlanet(planets[0].id), "DestroyPlanet");
    planets = await planetFactory.getPlanets.call();
    assert.equal(planets[0].name, "");
    assert.equal(planets[1].name, "Etherra");
  });

  it("should fail if a non-owner tries to destroy a planet", async () => {
    const planets = await planetFactory.getPlanets.call();
    await truffleAssert.reverts(await planetFactory.destroyPlanet(planets[0].id, {from: playerRed}));
    truffleAssert.eventEmitted(await planetFactory.destroyPlanet(planets[0].id, {from: owner}));
  });

});
