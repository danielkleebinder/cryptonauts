// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CryptoverseAstronauts.sol";

/**
 * @title Cryptoverse Item System
 * @dev The cryptoverse item system manages all item related stuff like creating and trading. This
 *      contract may throw the following error codes:
 *
 *        - E-I1: You are not the owner of this item
 *        - E-I2: You cannot perform this action while the item is equipped
 *        - E-I3: This is not an item you can buy
 *        - E-I4: This item is too expensive for you
 *        - E-I5: This item was already destroyed
 *        - E-I6: The upgrade is too expensive for you
 *        - E-I7: This item has already reached maximum upgrade level - you cannot improve it further
 *        - E-I8: You cannot equip more items - unequip one to equip a new one
 *        - E-I9: This item is already unequipped
 *
 */
contract CryptoverseItems is CryptoverseAstronauts {

    event ItemBought(address buyer, uint itemId);
    event ItemUpgraded(address owner, uint itemId);
    event ItemEquipped(address owner, uint itemId);
    event ItemUnequipped(address owner, uint itemId);
    event ItemDestroyed(address destroyer, uint itemId);

    event ItemTypeCreated(uint itemTypeId);


    // The item struct is used both as an item type template and as the item itself which
    // the players can use. Items improve the players performance and can be sold.
    struct Item {

        // Unique item identifier
        uint id;

        // The name of the item (should be unique as well, but is no constraint)
        string name;

        // The items level. Improving typically makes the much stronger, thats why this
        // field should have an upper bound.
        uint16 level;

        // Indicators for how much this item improves the players capabilities
        uint16 mining;
        uint16 attack;
        uint16 defense;

        // Depending on the type (being a template or a purchased item owned by a player),
        // this field either indicates the initial purchase cost or the upgrade cost.
        uint64 cost;

        // Players can destroy and equip items.
        bool destroyed;
        bool equipped;
    }

    uint16 public maxItemLevel = 4;
    uint16 public maxEquipmentCount = 3;

    Item[] public itemTypes;
    Item[] public items;

    mapping(uint => address) itemToOwner;
    mapping(address => uint) ownerItemCount;
    mapping(address => uint) ownerEquippedItemCount;


    /**
     * @dev Some actions can only be performed by the owner of an item.
     * @param _itemId Item ID to check the owner of.
     */
    modifier onlyOwnerOfItem(uint _itemId) {
        require(msg.sender == itemToOwner[_itemId], "E-I1");
        _;
    }

    /**
     * @dev Some actions can only be performed when the item is not equipped at the moment.
     * @param _itemId Item ID to check if it is currently equipped.
     */
    modifier onlyUnequippedItem(uint _itemId) {
        require(!items[_itemId].equipped, "E-I2");
        _;
    }

    /**
     * @dev Some actions can only be performed for items that are not destroyed yet.
     * @param _itemId Item ID to check if not destroyed.
     */
    modifier onlyNotDestroyedItem(uint _itemId) {
        require(!items[_itemId].destroyed, "E-I5");
        _;
    }

    /**
     * @dev Owners of the contract (and the game) can create new item templates (or
     *      types). Those can then be bought by the players. Please be careful with
     *      the stats. They improve dramatically with the items level as well.
     *
     * @param _name     The items (hopefully) unique name.
     * @param _mining   How much does this item improve mining (at level 0).
     * @param _attack   How much does this item improve attack (at level 0).
     * @param _defense  How much does this item improve defense (at level 0).
     * @param _cost     Initial purchase costs.
     */
    function createItemType(string memory _name, uint16 _mining, uint16 _attack, uint16 _defense, uint64 _cost) external onlyOwner {
        uint id = itemTypes.length;
        itemTypes.push(Item(id, _name, 1, _mining, _attack, _defense, _cost, false, false));
        emit ItemTypeCreated(id);
    }

    /**
     * @dev Returns all currently available item templates.
     */
    function getItemTypes() external view returns (Item[] memory) {
        return itemTypes;
    }

    /**
     * @dev Tests if the given item type ID actually belongs to an item.
     */
    function isItemType(uint _itemTypeId) public view returns (bool) {
        return itemTypes.length > _itemTypeId;
    }

    /**
     * @dev Players buy a certain item type. This function will revert if the player
     *      does not have enough tokens.
     * @param _itemTypeId The type of item which the player want to purchase.
     */
    function buyItem(uint _itemTypeId) external {
        require(isItemType(_itemTypeId), "E-I3");

        Item memory itemType = itemTypes[_itemTypeId];

        // Burn the items cost
        require(balanceOf(msg.sender) >= itemType.cost, "E-I4");
        burn(itemType.cost);

        // Buy the item by copying the item type
        uint id = items.length;
        items.push(Item(id,
            itemType.name,
            itemType.level,
            itemType.mining,
            itemType.attack,
            itemType.defense,
            itemType.cost * 2,
            false,
            false));
        itemToOwner[id] = msg.sender;
        ownerItemCount[msg.sender]++;

        // Emit the event to notify the buyer
        emit ItemBought(msg.sender, id);
    }

    /**
     * @dev Destroys the item with the given ID. Only the owner of the item can
     *      destroy it. This action cannot be undone.
     * @param _itemId The item which should be destroyed.
     */
    function destroyItem(uint _itemId) external onlyOwnerOfItem(_itemId)
                                                onlyUnequippedItem(_itemId)
                                                onlyNotDestroyedItem(_itemId) {
        items[_itemId].destroyed = true;
        ownerItemCount[msg.sender]--;
        emit ItemDestroyed(msg.sender, _itemId);
    }

    /**
     * @dev Increases the level of the item by one. This function will revert if the player
     *      does not have enough tokens.
     * @param _itemId The item which should be upgraded.
     */
    function upgradeItem(uint _itemId) external onlyOwnerOfItem(_itemId)
                                                onlyUnequippedItem(_itemId)
                                                onlyNotDestroyedItem(_itemId) {
        Item storage item = items[_itemId];

        // Burn the amount of tokens that this upgrade costs
        require(balanceOf(msg.sender) >= item.cost, "E-I6");
        require(item.level < maxItemLevel, "E-I7");
        burn(item.cost);

        // Level up the item
        item.level++;
        item.mining *= 2;
        item.attack *= 2;
        item.defense *= 2;
        item.cost *= 2;

        // Emit the event to notify the owner of the upgrade
        emit ItemUpgraded(msg.sender, item.id);
    }

    /**
     * @dev For items to be in effect, players have to equip them. There is also a maximum
     *      amount of equipment a player can use at a time.
     * @param _itemId The item which should be equipped.
     */
    function equip(uint _itemId) external onlyOwnerOfItem(_itemId)
                                          onlyUnequippedItem(_itemId)
                                          onlyNotDestroyedItem(_itemId) {
        Astronaut storage me = ownerToAstronaut[msg.sender];
        Item storage item = items[_itemId];

        require(ownerEquippedItemCount[msg.sender] < maxEquipmentCount, "E-I8");

        me.mining += item.mining;
        me.attack += item.attack;
        me.defense += item.defense;
        item.equipped = true;
        ownerEquippedItemCount[msg.sender]++;

        // Emit the event to notify the owner that the item is now equipped
        emit ItemEquipped(msg.sender, item.id);
    }

    /**
     * @dev Some actions require the player to unequip an item.
     * @param _itemId The item which should be unequipped.
     */
    function unequip(uint _itemId) external onlyOwnerOfItem(_itemId) {
        Astronaut storage me = ownerToAstronaut[msg.sender];
        Item storage item = items[_itemId];

        require(item.equipped, "E-I9");

        me.mining -= item.mining;
        me.attack -= item.attack;
        me.defense -= item.defense;
        item.equipped = false;
        ownerEquippedItemCount[msg.sender]--;

        // Emit the event to notify the owner that the item is now unequipped
        emit ItemUnequipped(msg.sender, item.id);
    }

    /**
     * @dev Returns all items of an owner. This function is external because it is really
     *      expensive for a contract to perform on distributed transactions.
     * @param _owner The owners address.
     */
    function getItemsByOwner(address _owner) external view returns (Item[] memory) {
        Item[] memory result = new Item[](ownerItemCount[_owner]);
        Item memory item;
        uint counter = 0;
        for (uint i = 0; i < items.length; i++) {
          item = items[i];
          if (!item.destroyed && itemToOwner[i] == _owner) {
            result[counter] = item;
            counter++;
          }
        }
        return result;
    }

    /**
     * @dev Sets the max item level. Items cannot be level higher than that. If the level
     *      should be decrease, items which are already higher than that will NOT be downgraded.
     * @param _maxItemLevel New max item level.
     */
    function setMaxItemLevel(uint16 _maxItemLevel) external onlyOwner {
        maxItemLevel = _maxItemLevel;
    }

    /**
     * @dev Sets the max amount of items that can be equipped at a time by a player.
     * @param _maxEquipmentCount New max equipment count.
     */
    function setMaxEquipmentCount(uint16 _maxEquipmentCount) external onlyOwner {
        maxEquipmentCount = _maxEquipmentCount;
    }
}
