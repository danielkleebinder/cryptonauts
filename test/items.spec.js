const truffleAssert = require('truffle-assertions');
const ItemsContract = artifacts.require("CryptoverseItems");
const web3 = ItemsContract.web3;

contract("Cryptoverse Items", async accounts => {

  const owner = accounts[0];
  const playerRed = accounts[1];
  const playerGreen = accounts[2];
  const playerBlue = accounts[3];

  let itemsInstance;

  function tokensToWei(tokenCount) {
    return tokenCount * 100;
  }

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
    await itemsInstance.buyTokens({from: playerRed, value: tokensToWei(100)});
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
    await itemsInstance.buyTokens({from: playerRed, value: tokensToWei(100)});
    await itemsInstance.createItemType("Spacesword", 1, 10, 3, 100);
    await truffleAssert.reverts(itemsInstance.buyItem(8768123, {from: playerRed}));
    const items = await itemsInstance.getItemsByOwner.call(playerRed);
    assert.equal(items.length, 0);
  });

  it("should not allow players to buy too expensive items", async () => {
    await itemsInstance.buyTokens({from: playerRed, value: tokensToWei(99)});
    await itemsInstance.createItemType("Spacesword", 1, 10, 3, 100);
    const itemTypes = await itemsInstance.getItemTypes.call();
    await truffleAssert.reverts(itemsInstance.buyItem(itemTypes[0].id, {from: playerRed}));
    const items = await itemsInstance.getItemsByOwner.call(playerRed);
    assert.equal(items.length, 0);
  });

  it("should destroy owned items", async () => {
    await itemsInstance.buyTokens({from: playerRed, value: tokensToWei(100)});
    await itemsInstance.createItemType("Spacesword", 1, 10, 3, 100);
    const itemTypes = await itemsInstance.getItemTypes.call();
    await itemsInstance.buyItem(itemTypes[0].id, {from: playerRed});

    const items = await itemsInstance.getItemsByOwner.call(playerRed);
    assert.equal(items.length, 1);

    truffleAssert.eventEmitted(await itemsInstance.destroyItem(items[0].id, {from: playerRed}), "ItemDestroyed");

    assert.equal((await itemsInstance.getItemsByOwner.call(playerRed)).length, 0);
  });

  it("should not destroy not owned items", async () => {
    await itemsInstance.buyTokens({from: playerRed, value: tokensToWei(100)});
    await itemsInstance.createItemType("Spacesword", 1, 10, 3, 100);
    const itemTypes = await itemsInstance.getItemTypes.call();
    await itemsInstance.buyItem(itemTypes[0].id, {from: playerRed});
    const items = await itemsInstance.getItemsByOwner.call(playerRed);
    await truffleAssert.reverts(itemsInstance.destroyItem(items[0].id, {from: playerBlue}));
  });

  it("should not destroy item twice", async () => {
    await itemsInstance.buyTokens({from: playerRed, value: tokensToWei(100)});
    await itemsInstance.createItemType("Spacesword", 1, 10, 3, 100);
    const itemTypes = await itemsInstance.getItemTypes.call();
    await itemsInstance.buyItem(itemTypes[0].id, {from: playerRed});
    const items = await itemsInstance.getItemsByOwner.call(playerRed);
    itemsInstance.destroyItem(items[0].id, {from: playerRed});
    await truffleAssert.reverts(itemsInstance.destroyItem(items[0].id, {from: playerRed}));
  });

  it("should upgrade item", async () => {
    await itemsInstance.buyTokens({from: playerRed, value: tokensToWei(1000)});
    await itemsInstance.createItemType("Spacesword", 1, 10, 3, 100);
    await itemsInstance.setMaxItemLevel(5);
    const itemTypes = await itemsInstance.getItemTypes.call();
    const buyCost = itemTypes[0].cost;

    await itemsInstance.buyItem(itemTypes[0].id, {from: playerRed});
    let items = await itemsInstance.getItemsByOwner.call(playerRed);
    const levelUpCost = items[0].cost;

    truffleAssert.eventEmitted(await itemsInstance.upgradeItem(items[0].id, {from: playerRed}), "ItemUpgraded");

    items = await itemsInstance.getItemsByOwner.call(playerRed);
    const balanceAfterLevelUp = (await itemsInstance.balanceOf.call(playerRed)).toNumber();

    assert.equal(balanceAfterLevelUp, 1000 - buyCost - levelUpCost);
    assert.equal(items[0].level, 2);
  });

  it("should not upgrade item if too expensive", async () => {
    await itemsInstance.buyTokens({from: playerRed, value: tokensToWei(150)});
    await itemsInstance.createItemType("Spacesword", 1, 10, 3, 100);
    await itemsInstance.setMaxItemLevel(5);
    const itemTypes = await itemsInstance.getItemTypes.call();
    await itemsInstance.buyItem(itemTypes[0].id, {from: playerRed});
    const items = await itemsInstance.getItemsByOwner.call(playerRed);
    await truffleAssert.reverts(itemsInstance.upgradeItem(items[0].id, {from: playerRed}));
  });

  it("should not upgrade destroyed item", async () => {
    await itemsInstance.buyTokens({from: playerRed, value: tokensToWei(1000)});
    await itemsInstance.createItemType("Spacesword", 1, 10, 3, 100);
    await itemsInstance.setMaxItemLevel(5);
    const itemTypes = await itemsInstance.getItemTypes.call();
    await itemsInstance.buyItem(itemTypes[0].id, {from: playerRed});
    const items = await itemsInstance.getItemsByOwner.call(playerRed);
    itemsInstance.upgradeItem(items[0].id, {from: playerRed});
    itemsInstance.destroyItem(items[0].id, {from: playerRed});
    await truffleAssert.reverts(itemsInstance.upgradeItem(items[0].id, {from: playerRed}));
  });

  it("should not upgrade item if max level was reached", async () => {
    await itemsInstance.buyTokens({from: playerRed, value: tokensToWei(10000)});
    await itemsInstance.createItemType("Spacesword", 1, 10, 3, 100);
    await itemsInstance.setMaxItemLevel(2);
    const itemTypes = await itemsInstance.getItemTypes.call();
    await itemsInstance.buyItem(itemTypes[0].id, {from: playerRed});
    let items = await itemsInstance.getItemsByOwner.call(playerRed);

    await itemsInstance.upgradeItem(items[0].id, {from: playerRed});
    await truffleAssert.reverts(itemsInstance.upgradeItem(items[0].id, {from: playerRed}));

    items = await itemsInstance.getItemsByOwner.call(playerRed);
    assert.equal(items[0].level, 2);
  });

  it("should not upgrade not owned item", async () => {
    await itemsInstance.buyTokens({from: playerRed, value: tokensToWei(1000)});
    await itemsInstance.createItemType("Spacesword", 1, 10, 3, 100);
    await itemsInstance.setMaxItemLevel(5);
    const itemTypes = await itemsInstance.getItemTypes.call();
    await itemsInstance.buyItem(itemTypes[0].id, {from: playerRed});
    let items = await itemsInstance.getItemsByOwner.call(playerRed);

    await truffleAssert.reverts(itemsInstance.upgradeItem(items[0].id, {from: playerBlue}));
    items = await itemsInstance.getItemsByOwner.call(playerRed);
    assert.equal(items[0].level, 1);
  });

  it("should not upgrade item if equipped", async () => {
    await itemsInstance.buyTokens({from: playerRed, value: tokensToWei(1000)});
    await itemsInstance.createItemType("Spacesword", 1, 10, 3, 100);
    await itemsInstance.setMaxItemLevel(5);
    const itemTypes = await itemsInstance.getItemTypes.call();
    await itemsInstance.buyItem(itemTypes[0].id, {from: playerRed});
    let items = await itemsInstance.getItemsByOwner.call(playerRed);

    await itemsInstance.equip(items[0].id, {from: playerRed});
    await truffleAssert.reverts(itemsInstance.upgradeItem(items[0].id, {from: playerRed}));
  });

  it("should not destroy item if equipped", async () => {
    await itemsInstance.buyTokens({from: playerRed, value: tokensToWei(1000)});
    await itemsInstance.createItemType("Spacesword", 1, 10, 3, 100);
    await itemsInstance.setMaxItemLevel(5);
    const itemTypes = await itemsInstance.getItemTypes.call();
    await itemsInstance.buyItem(itemTypes[0].id, {from: playerRed});
    let items = await itemsInstance.getItemsByOwner.call(playerRed);

    await itemsInstance.equip(items[0].id, {from: playerRed});
    await truffleAssert.reverts(itemsInstance.destroyItem(items[0].id, {from: playerRed}));
  });

  it("should not equip non-owned item", async () => {
    await itemsInstance.buyTokens({from: playerRed, value: tokensToWei(1000)});
    await itemsInstance.createItemType("Spacesword", 1, 10, 3, 100);
    await itemsInstance.setMaxItemLevel(5);
    const itemTypes = await itemsInstance.getItemTypes.call();
    await itemsInstance.buyItem(itemTypes[0].id, {from: playerRed});
    let items = await itemsInstance.getItemsByOwner.call(playerRed);

    await truffleAssert.reverts(itemsInstance.equip(items[0].id, {from: playerBlue}));
  });

  it("should not equip destroyed item", async () => {
    await itemsInstance.buyTokens({from: playerRed, value: tokensToWei(1000)});
    await itemsInstance.createItemType("Spacesword", 1, 10, 3, 100);
    await itemsInstance.setMaxItemLevel(5);
    const itemTypes = await itemsInstance.getItemTypes.call();
    await itemsInstance.buyItem(itemTypes[0].id, {from: playerRed});
    let items = await itemsInstance.getItemsByOwner.call(playerRed);
    itemsInstance.destroyItem(items[0].id, {from: playerRed});
    await truffleAssert.reverts(itemsInstance.equip(items[0].id, {from: playerRed}));
  });

  it("should not un-equip unequipped items", async () => {
    await itemsInstance.buyTokens({from: playerRed, value: tokensToWei(1000)});
    await itemsInstance.createItemType("Spacesword", 1, 10, 3, 100);
    await itemsInstance.setMaxItemLevel(5);
    const itemTypes = await itemsInstance.getItemTypes.call();
    await itemsInstance.buyItem(itemTypes[0].id, {from: playerRed});
    let items = await itemsInstance.getItemsByOwner.call(playerRed);

    await truffleAssert.reverts(itemsInstance.unequip(items[0].id, {from: playerRed}));
  });

  it("should not equip more items than allowed", async () => {
    await itemsInstance.buyTokens({from: playerRed, value: tokensToWei(1000)});
    await itemsInstance.createItemType("Item-1", 1, 10, 3, 100);
    await itemsInstance.createItemType("Item-2", 1, 10, 3, 100);
    await itemsInstance.createItemType("Item-3", 1, 10, 3, 100);
    await itemsInstance.setMaxItemLevel(5);
    await itemsInstance.setMaxEquipmentCount(2);

    const itemTypes = await itemsInstance.getItemTypes.call();

    await itemsInstance.buyItem(itemTypes[0].id, {from: playerRed});
    await itemsInstance.buyItem(itemTypes[1].id, {from: playerRed});
    await itemsInstance.buyItem(itemTypes[2].id, {from: playerRed});

    let items = await itemsInstance.getItemsByOwner.call(playerRed);

    truffleAssert.eventEmitted(await itemsInstance.equip(items[0].id, {from: playerRed}), "ItemEquipped");
    truffleAssert.eventEmitted(await itemsInstance.equip(items[1].id, {from: playerRed}), "ItemEquipped");
    await truffleAssert.reverts(itemsInstance.equip(items[2].id, {from: playerRed}));
  });

  it("should improve player stats if item is equipped", async () => {
    await itemsInstance.buyTokens({from: playerRed, value: tokensToWei(1000)});
    await itemsInstance.createItemType("Spacesword", 1, 10, 3, 100);
    await itemsInstance.setMaxItemLevel(5);
    const itemTypes = await itemsInstance.getItemTypes.call();
    await itemsInstance.buyItem(itemTypes[0].id, {from: playerRed});
    let items = await itemsInstance.getItemsByOwner.call(playerRed);

    let me = await itemsInstance.getMyAstronaut.call({from: playerRed});
    const plainPlayerMining = +me.mining;
    const plainPlayerAttack = +me.attack;
    const plainPlayerDefense = +me.defense;

    await itemsInstance.equip(items[0].id, {from: playerRed});

    me = await itemsInstance.getMyAstronaut.call({from: playerRed});
    const equippedPlayerMining = +me.mining;
    const equippedPlayerAttack = +me.attack;
    const equippedPlayerDefense = +me.defense;

    assert.equal(plainPlayerMining + (+items[0].mining), equippedPlayerMining);
    assert.equal(plainPlayerAttack + (+items[0].attack), equippedPlayerAttack);
    assert.equal(plainPlayerDefense + (+items[0].defense), equippedPlayerDefense);
  });

  it("should reduce player stats if item is unequipped", async () => {
    await itemsInstance.buyTokens({from: playerRed, value: tokensToWei(1000)});
    await itemsInstance.createItemType("Spacesword", 1, 10, 3, 100);
    await itemsInstance.setMaxItemLevel(5);
    const itemTypes = await itemsInstance.getItemTypes.call();
    await itemsInstance.buyItem(itemTypes[0].id, {from: playerRed});
    let items = await itemsInstance.getItemsByOwner.call(playerRed);

    await itemsInstance.equip(items[0].id, {from: playerRed});
    let me = await itemsInstance.getMyAstronaut.call({from: playerRed});
    const equippedPlayerMining = +me.mining;
    const equippedPlayerAttack = +me.attack;
    const equippedPlayerDefense = +me.defense;

    truffleAssert.eventEmitted(await itemsInstance.unequip(items[0].id, {from: playerRed}), "ItemUnequipped");
    me = await itemsInstance.getMyAstronaut.call({from: playerRed});
    const plainPlayerMining = +me.mining;
    const plainPlayerAttack = +me.attack;
    const plainPlayerDefense = +me.defense;

    assert.equal(equippedPlayerMining - (+items[0].mining), plainPlayerMining);
    assert.equal(equippedPlayerAttack - (+items[0].attack), plainPlayerAttack);
    assert.equal(equippedPlayerDefense - (+items[0].defense), plainPlayerDefense);
  });
});
