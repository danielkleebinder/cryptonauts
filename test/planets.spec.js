const truffleAssert = require('truffle-assertions');
const PlanetsContract = artifacts.require("CryptoversePlanets");
const web3 = PlanetsContract.web3;

contract("Cryptoverse Planets", async accounts => {

  const owner = accounts[0];
  const playerRed = accounts[1];
  const playerGreen = accounts[2];
  const playerBlue = accounts[3];

  let planetsInstance;

  beforeEach("deploy and init", async () => {
    planetsInstance = await PlanetsContract.new();
  });

  it("should create the default planets", async () => {
    const planets = await planetsInstance.getPlanets.call();
    assert.equal(planets.length, 2);
    assert.equal(planets[0].name, "Crypton");
    assert.equal(planets[1].name, "Etherra");
  });

  it("should check if a planet truly is a planet", async () => {
    let planets = await planetsInstance.getPlanets.call();
    assert.equal(await planetsInstance.isPlanet.call(planets[0].id), true);
    assert.equal(await planetsInstance.isPlanet.call(47238768422817), false);
  });

});
