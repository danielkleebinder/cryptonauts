const truffleAssert = require('truffle-assertions');
const ExplorationContract = artifacts.require("CryptoverseExploration");
const web3 = ExplorationContract.web3;

contract("Cryptoverse Exploration", async accounts => {

  const owner = accounts[0];
  const playerRed = accounts[1];
  const playerGreen = accounts[2];
  const playerBlue = accounts[3];

  let explorationInstance;
  let planets;

  async function getExplorerCount(planetId) {
    return (await explorationInstance.explorerCount.call(planetId)).toNumber();
  }

  async function getExploration(playerId) {
    return await explorationInstance.explorations.call(playerId);
  }

  async function getMyExploration() {
    return await explorationInstance.getMyExploration.call();
  }

  beforeEach("deploy and init", async () => {
    explorationInstance = await ExplorationContract.new();
    planets = await explorationInstance.getPlanets.call();
  });

  it("should immediately start planet exploration for beginners", async () => {
    assert.equal(await getExplorerCount(planets[0].id), 0);
    truffleAssert.eventEmitted(await explorationInstance.explorePlanet(planets[0].id), "PlanetExplorerArrived");
    assert.equal(await getExplorerCount(planets[0].id), 1);
  });

  it("should throw if player is already exploring", async () => {
    truffleAssert.eventEmitted(await explorationInstance.explorePlanet(planets[0].id), "PlanetExplorerArrived");
    assert.equal(await getExplorerCount(planets[0].id), 1);

    // Cannot start exploring the same planet again
    await truffleAssert.reverts(explorationInstance.explorePlanet(planets[0].id));
    assert.equal(await getExplorerCount(planets[0].id), 1);

    // Cannot just start exploring another planet
    await truffleAssert.reverts(explorationInstance.explorePlanet(planets[1].id));
    assert.equal(await getExplorerCount(planets[0].id), 1);
  });

  it("should leave a planet", async () => {
    await explorationInstance.explorePlanet(planets[0].id);
    assert.equal(await getExplorerCount(planets[0].id), 1);
    truffleAssert.eventEmitted(await explorationInstance.leavePlanet(), "PlanetExplorerLeft");
    assert.equal(await getExplorerCount(planets[0].id), 0);
  });

  it("should arrive after travel on planet", async () => {
    await explorationInstance.setRequiredTravelTime(0);
    await explorationInstance.leavePlanet();
    assert.equal((await getExploration(owner)).exploring, false);
    truffleAssert.eventEmitted(await explorationInstance.explorePlanet(planets[0].id), "PlanetExplorerArrived");
    assert.equal(await getExplorerCount(planets[0].id), 1);
    assert.equal((await getExploration(owner)).exploring, true);
  });

  it("should throw if player starts exploring before arriving", async () => {
    await explorationInstance.leavePlanet();
    await truffleAssert.reverts(explorationInstance.explorePlanet(planets[0].id));
    assert.equal(await getExplorerCount(planets[0].id), 0);
  });

  it("should travel from one to another planet", async () => {
    await explorationInstance.setRequiredTravelTime(0);
    await explorationInstance.leavePlanet();
    await explorationInstance.explorePlanet(planets[0].id);
    assert.equal(await getExplorerCount(planets[0].id), 1);
    assert.equal(await getExplorerCount(planets[1].id), 0);

    await explorationInstance.leavePlanet();
    await explorationInstance.explorePlanet(planets[1].id);
    assert.equal(await getExplorerCount(planets[0].id), 0);
    assert.equal(await getExplorerCount(planets[1].id), 1);
  });

  it("should collect mined planet resources", async () => {
    await explorationInstance.setRequiredTravelTime(0);
    await explorationInstance.leavePlanet();
    await explorationInstance.explorePlanet(planets[0].id);
    assert.equal(await getExplorerCount(planets[0].id), 1);
    truffleAssert.eventEmitted(await explorationInstance.collectMinedPlanetResources(), "PlanetResourcesCollected");
  });

  it("should update my exploration", async () => {
    let exploration = await getMyExploration();
    assert.equal(exploration.exploring, false);

    await explorationInstance.explorePlanet(planets[0].id);
    exploration = await getMyExploration();
    assert.equal(exploration.planetId, planets[0].id);
    assert.equal(exploration.exploring, true);

    await explorationInstance.leavePlanet();
    exploration = await getMyExploration();
    assert.equal(exploration.exploring, false);
  });
});
