// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Cryptoverse.sol";

/**
 * @title Cryptoverse Item System
 * @dev The cryptoverse item system manages all item related stuff like creating and trading.
 */
contract CryptoverseItems is Cryptoverse {
    
    event ItemBought(address buyer, uint itemId);
    event ItemUpgraded(address owner, uint itemId);
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
        
        // The mining factor which indicates how much this item improves mining speed.
        uint16 mining;
        
        // The attack factor which indicates how much this item improves offensive damage.
        uint16 attack;
        
        // The attack factor which indicates how much this item improves defense against
        // other players.
        uint16 defense;
        
        // Depending on the type (being a template or a purchased item owned by a player),
        // this field either indicates the initial purchase cost or the upgrade cost.
        uint64 cost;
        
        // Players can destroy item. They are no longer available if they got destroyed.
        bool destroyed;
    }
    
    uint16 private maxItemLevel = 4;
    
    Item[] public itemTypes;
    Item[] public items;
    
    mapping(uint => address) itemToOwner;
    mapping(address => uint) ownerItemCount;
    
    
    /**
     * @dev Some actions can only be performed by the owner of an item.
     * @param _itemId Item ID to check the owner of.
     */
    modifier onlyItemOwnerOf(uint _itemId) {
        require(msg.sender == itemToOwner[_itemId], "Not the item owner");
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
        itemTypes.push(Item(id, _name, 1, _mining, _attack, _defense, _cost, false));
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
        require(isItemType(_itemTypeId), "Not an item");
        
        Item memory itemType = itemTypes[_itemTypeId];
        
        // Burn the items cost
        require(balanceOf(msg.sender) >= itemType.cost, "Too expensive");
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
            false));
        itemToOwner[id] = msg.sender;
        ownerItemCount[msg.sender]++;
        
        // Emit the event to notify the buyer
        emit ItemBought(msg.sender, id);
    }
    
    /**
     * @dev Destroys the item with the given ID. On the owner of the item can
     *      destroy it. This action cannot be undone.
     * @param _itemId The item which should be destroyed.
     */
    function destroyItem(uint _itemId) external onlyItemOwnerOf(_itemId) {
        items[_itemId].destroyed = true;
        ownerItemCount[msg.sender]--;
        emit ItemDestroyed(msg.sender, _itemId);
    }
    
    /**
     * @dev Increases the level of the item by one. This function will revert if the player
     *      does not have enough tokens.
     * @param _itemId The item which should be upgraded.
     */
    function levelUpItem(uint _itemId) external onlyItemOwnerOf(_itemId) {
        Item storage item = items[_itemId];
        
        // Burn the amount of tokens that this upgrade costs
        require(balanceOf(msg.sender) >= item.cost, "Too expensive");
        require(item.level < maxItemLevel, "Can't upgrade further");
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
     * @dev Returns all items of an owner.
     * @param _owner The owners address.
     */
    function getItemsByOwner(address _owner) public view returns (Item[] memory) {
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
     * @dev Returns the current max item level that can be reached.
     */
    function getMaxItemLevel() external view returns (uint16) {
        return maxItemLevel;
    }
}
