const truffleAssert = require('truffle-assertions');
const ItemsContract = artifacts.require("CryptoverseItems");
const web3 = ItemsContract.web3;

contract("Cryptoverse Items", async accounts => {

  const owner = accounts[0];
  const playerRed = accounts[1];
  const playerGreen = accounts[2];
  const playerBlue = accounts[3];

  let itemsInstance;

  beforeEach("deploy and init", async () => {
    itemsInstance = await ItemsContract.new();
  });

  it("should not allow players to start with any item", async () => {
    const items = await itemsInstance.getItemsByOwner.call(owner);
    const itemTypes = await itemsInstance.getItemTypes.call();
    assert.equal(items.length, 0);
    assert.equal(itemTypes.length, 0);
  });

  it("should allow only owners to create an item type", async () => {
    // Should I actually call the Spacesword "Lasersword"? Hmmm ... maybe not, I might get
    // into trouble with Disney.
    await truffleAssert.reverts(itemsInstance.createItemType("Spacesword", 1, 10, 3, 100, {from: playerRed}));
    assert.equal((await itemsInstance.getItemTypes.call()).length, 0);

    truffleAssert.eventEmitted(await itemsInstance.createItemType("Spacesword", 1, 10, 3, 100), "ItemTypeCreated");

    const itemTypes = await itemsInstance.getItemTypes.call();
    assert.equal(itemTypes.length, 1);
    assert.equal(itemTypes[0].name, "Spacesword");
    assert.equal(itemTypes[0].level, 1);
    assert.equal(itemTypes[0].mining, 1);
    assert.equal(itemTypes[0].attack, 10);
    assert.equal(itemTypes[0].defense, 3);
    assert.equal(itemTypes[0].cost, 100);
    assert.equal(itemTypes[0].destroyed, false);
  });

  it("should check if an item type truly is an item type", async () => {
    await itemsInstance.createItemType("Spacesword", 1, 10, 3, 100);
    let itemTypes = await itemsInstance.getItemTypes.call();
    assert.equal(await itemsInstance.isItemType.call(itemTypes[0].id), true);
    assert.equal(await itemsInstance.isItemType.call(47238768422817), false);
  });

  it("should allow players to buy existing items", async () => {
    await itemsInstance.mint(playerRed, 100);
    await itemsInstance.createItemType("Spacesword", 1, 10, 3, 100);
    const itemTypes = await itemsInstance.getItemTypes.call();
    const balanceBeforeBuy = (await itemsInstance.balanceOf.call(playerRed)).toNumber();

    assert.equal(balanceBeforeBuy, 100);
    truffleAssert.eventEmitted(await itemsInstance.buyItem(itemTypes[0].id, {from: playerRed}), "ItemBought");

    const balanceAfterBuy = (await itemsInstance.balanceOf.call(playerRed)).toNumber();
    assert.equal(balanceAfterBuy, 0);

    const items = await itemsInstance.getItemsByOwner.call(playerRed);
    assert.equal(items.length, 1);
    assert.equal(items[0].level, 1);
  });

  it("should not allow players to buy non-existing items", async () => {
    await itemsInstance.mint(playerRed, 100);
    await itemsInstance.createItemType("Spacesword", 1, 10, 3, 100);
    await truffleAssert.reverts(itemsInstance.buyItem(8768123, {from: playerRed}));
    const items = await itemsInstance.getItemsByOwner.call(playerRed);
    assert.equal(items.length, 0);
  });

  it("should not allow players to buy too expensive items", async () => {
    await itemsInstance.mint(playerRed, 99);
    await itemsInstance.createItemType("Spacesword", 1, 10, 3, 100);
    const itemTypes = await itemsInstance.getItemTypes.call();
    await truffleAssert.reverts(itemsInstance.buyItem(itemTypes[0].id, {from: playerRed}));
    const items = await itemsInstance.getItemsByOwner.call(playerRed);
    assert.equal(items.length, 0);
  });

  it("should destroy owned items", async () => {
    await itemsInstance.mint(playerRed, 100);
    await itemsInstance.createItemType("Spacesword", 1, 10, 3, 100);
    const itemTypes = await itemsInstance.getItemTypes.call();
    await itemsInstance.buyItem(itemTypes[0].id, {from: playerRed});

    const items = await itemsInstance.getItemsByOwner.call(playerRed);
    assert.equal(items.length, 1);

    truffleAssert.eventEmitted(await itemsInstance.destroyItem(items[0].id, {from: playerRed}), "ItemDestroyed");

    assert.equal((await itemsInstance.getItemsByOwner.call(playerRed)).length, 0);
  });

  it("should not destroy not owned items", async () => {
    await itemsInstance.mint(playerRed, 100);
    await itemsInstance.createItemType("Spacesword", 1, 10, 3, 100);
    const itemTypes = await itemsInstance.getItemTypes.call();
    await itemsInstance.buyItem(itemTypes[0].id, {from: playerRed});
    const items = await itemsInstance.getItemsByOwner.call(playerRed);
    await truffleAssert.reverts(itemsInstance.buyItem(items[0].id, {from: playerBlue}));
  });

  it("should level up item", async () => {
    await itemsInstance.mint(playerRed, 1000);
    await itemsInstance.createItemType("Spacesword", 1, 10, 3, 100);
    await itemsInstance.setMaxItemLevel(5);
    const itemTypes = await itemsInstance.getItemTypes.call();
    const buyCost = itemTypes[0].cost;

    await itemsInstance.buyItem(itemTypes[0].id, {from: playerRed});
    let items = await itemsInstance.getItemsByOwner.call(playerRed);
    const levelUpCost = items[0].cost;

    truffleAssert.eventEmitted(await itemsInstance.levelUpItem(items[0].id, {from: playerRed}), "ItemUpgraded");

    items = await itemsInstance.getItemsByOwner.call(playerRed);
    const balanceAfterLevelUp = (await itemsInstance.balanceOf.call(playerRed)).toNumber();

    assert.equal(balanceAfterLevelUp, 1000 - buyCost - levelUpCost);
    assert.equal(items[0].level, 2);
  });

  it("should not level up item if too expensive", async () => {
    await itemsInstance.mint(playerRed, 150);
    await itemsInstance.createItemType("Spacesword", 1, 10, 3, 100);
    await itemsInstance.setMaxItemLevel(5);
    const itemTypes = await itemsInstance.getItemTypes.call();
    await itemsInstance.buyItem(itemTypes[0].id, {from: playerRed});
    const items = await itemsInstance.getItemsByOwner.call(playerRed);
    await truffleAssert.reverts(itemsInstance.levelUpItem(items[0].id, {from: playerRed}));
  });

  it("should not level up item if max level was reached", async () => {
    await itemsInstance.mint(playerRed, 10000);
    await itemsInstance.createItemType("Spacesword", 1, 10, 3, 100);
    await itemsInstance.setMaxItemLevel(2);
    const itemTypes = await itemsInstance.getItemTypes.call();
    await itemsInstance.buyItem(itemTypes[0].id, {from: playerRed});
    let items = await itemsInstance.getItemsByOwner.call(playerRed);

    await itemsInstance.levelUpItem(items[0].id, {from: playerRed});
    await truffleAssert.reverts(itemsInstance.levelUpItem(items[0].id, {from: playerRed}));

    items = await itemsInstance.getItemsByOwner.call(playerRed);
    assert.equal(items[0].level, 2);
  });

  it("should not level up not owned item", async () => {
    await itemsInstance.mint(playerRed, 10000);
    await itemsInstance.createItemType("Spacesword", 1, 10, 3, 100);
    await itemsInstance.setMaxItemLevel(5);
    const itemTypes = await itemsInstance.getItemTypes.call();
    await itemsInstance.buyItem(itemTypes[0].id, {from: playerRed});
    let items = await itemsInstance.getItemsByOwner.call(playerRed);

    await truffleAssert.reverts(itemsInstance.levelUpItem(items[0].id, {from: playerBlue}));
    items = await itemsInstance.getItemsByOwner.call(playerRed);
    assert.equal(items[0].level, 1);
  });

  it("should transfer an item", async () => {
    await itemsInstance.mint(playerRed, 10000);
    await itemsInstance.createItemType("Spacesword", 1, 10, 3, 100);
    await itemsInstance.setMaxItemLevel(5);
    const itemTypes = await itemsInstance.getItemTypes.call();
    await itemsInstance.buyItem(itemTypes[0].id, {from: playerRed});

    let myItems = await itemsInstance.getItemsByOwner.call(playerRed);
    let yourItems = await itemsInstance.getItemsByOwner.call(playerGreen);
    assert.equal(myItems.length, 1);
    assert.equal(myItems[0].name, "Spacesword");
    assert.equal(yourItems.length, 0);

    truffleAssert.eventEmitted(await itemsInstance.transferItemTo(playerGreen, myItems[0].id, {from: playerRed}), "ItemTransferred");

    myItems = await itemsInstance.getItemsByOwner.call(playerRed);
    yourItems = await itemsInstance.getItemsByOwner.call(playerGreen);
    assert.equal(myItems.length, 0);
    assert.equal(yourItems.length, 1);
    assert.equal(yourItems[0].name, "Spacesword");
  });

  it("should not transfer not owned item", async () => {
    await itemsInstance.mint(playerRed, 10000);
    await itemsInstance.createItemType("Spacesword", 1, 10, 3, 100);
    await itemsInstance.setMaxItemLevel(5);
    const itemTypes = await itemsInstance.getItemTypes.call();
    await itemsInstance.buyItem(itemTypes[0].id, {from: playerRed});

    let myItems = await itemsInstance.getItemsByOwner.call(playerRed);
    let yourItems = await itemsInstance.getItemsByOwner.call(playerGreen);
    assert.equal(myItems.length, 1);
    assert.equal(myItems[0].name, "Spacesword");
    assert.equal(yourItems.length, 0);

    await truffleAssert.reverts(itemsInstance.transferItemTo(playerGreen, myItems[0].id, {from: playerGreen}));

    myItems = await itemsInstance.getItemsByOwner.call(playerRed);
    yourItems = await itemsInstance.getItemsByOwner.call(playerGreen);
    assert.equal(myItems.length, 1);
    assert.equal(myItems[0].name, "Spacesword");
    assert.equal(yourItems.length, 0);
  });
});
