const truffleAssert = require('truffle-assertions');
const CryptoverseContract = artifacts.require("Cryptoverse");
const web3 = CryptoverseContract.web3;

contract("Cryptoverse Base", async accounts => {

  const owner = accounts[0];
  const playerRed = accounts[1];
  const playerGreen = accounts[2];
  const playerBlue = accounts[3];

  let cryptoverseInstance;

  beforeEach("deploy and init", async () => {
    cryptoverseInstance = await CryptoverseContract.new();
  });

  it("should define deployer as owner", async () => {
    assert(await cryptoverseInstance.isOwner.call());
    assert(!(await cryptoverseInstance.isOwner.call({from: playerRed})));
  });

  it("should only allow owners to add owners", async () => {
    await truffleAssert.reverts(cryptoverseInstance.addOwner(playerRed, {from: playerRed}));
    await truffleAssert.reverts(cryptoverseInstance.addOwner(playerBlue, {from: playerRed}));
    truffleAssert.eventEmitted(await cryptoverseInstance.addOwner(playerRed), "OwnerAdded");
  });

  it("should let owners remove themselves", async () => {
    await truffleAssert.reverts(cryptoverseInstance.renounceOwner({from: playerRed}));
    truffleAssert.eventEmitted(await cryptoverseInstance.renounceOwner({from: owner}), "OwnerRemoved");
  });

  it("should only allow owners to redeem Ether", async () => {
    const oneEther = web3.utils.toWei("1", "ether");

    const initialPlayerBalance = await web3.eth.getBalance(owner);
    await web3.eth.sendTransaction({
      from: owner,
      to: cryptoverseInstance.address,
      value: oneEther
    });

    const reducedPlayerBalance = await web3.eth.getBalance(owner);
    const initialContractBalance = await web3.eth.getBalance(cryptoverseInstance.address);

    assert.equal(initialContractBalance, oneEther);
    assert(reducedPlayerBalance < (initialPlayerBalance - 1));

    await truffleAssert.reverts(cryptoverseInstance.redeem({from: playerRed}));
    let contractBalance = await web3.eth.getBalance(cryptoverseInstance.address);
    assert.equal(contractBalance, oneEther);

    await cryptoverseInstance.redeem({from: owner});
    contractBalance = await web3.eth.getBalance(cryptoverseInstance.address);
    assert.equal(contractBalance, 0);
  });
});
