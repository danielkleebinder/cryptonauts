// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Cryptoverse.sol";

/**
 * @title Cryptoverse Item System
 * @dev The cryptoverse item system manages all item related stuff like creating and trading.
 */
contract CryptoverseItems is Cryptoverse {
    
    event ItemBought(address buyer, uint itemId);
    event ItemTransferred(address previousOwner, address newOwner);
    event ItemUpgraded(address owner, uint itemId);
    event ItemDestroyed(address destroyer, uint itemId);
    
    event ItemTypeCreated(uint itemTypeId);
    
    struct Item {
        uint id;
        string name;
        uint16 level;
        uint16 mining;
        uint16 attack;
        uint16 defense;
        uint64 cost;
        bool destroyed;
    }
    
    uint16 private maxItemLevel = 4;
    
    Item[] public itemTypes;
    Item[] public items;
    
    mapping(uint => address) itemToOwner;
    mapping(address => uint) ownerItemCount;
    
    
    modifier onlyItemOwnerOf(uint _itemId) {
        require(msg.sender == itemToOwner[_itemId], "You are not the owner of this item");
        _;
    }
    
    function createItemType(string memory _name, uint16 _mining, uint16 _attack, uint16 _defense, uint64 _cost) external onlyOwner {
        uint id = itemTypes.length;
        itemTypes.push(Item(id, _name, 1, _mining, _attack, _defense, _cost, false));
        emit ItemTypeCreated(id);
    }
    
    function buyItem(uint _itemTypeId) external {
        Item memory itemType = itemTypes[_itemTypeId];
        
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
        
        // Burn the items cost
        burn(itemType.cost);
        
        // Emit the event to notify the buyer
        emit ItemBought(msg.sender, id);
    }
    
    function destroyItem(uint _itemId) external onlyItemOwnerOf(_itemId) {
        items[_itemId].destroyed = true;
        emit ItemDestroyed(msg.sender, _itemId);
    }
    
    function levelUp(uint _itemId) external onlyItemOwnerOf(_itemId) {
        Item storage item = items[_itemId];
        
        // Level up the item
        item.level++;
        item.mining *= 2;
        item.attack *= 2;
        item.defense *= 2;
        item.cost *= 2;
        
        // Burn the amount of tokens that this upgrade costs
        burn(item.cost);
        
        // Emit the event to notify the owner of the upgrade
        emit ItemUpgraded(msg.sender, item.id);
    }
    
    function transferItemTo(address _newOwner, uint _itemId) external onlyItemOwnerOf(_itemId) {
        itemToOwner[_itemId] = _newOwner;
        emit ItemTransferred(msg.sender, _newOwner);
    }
    
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
    
    function setMaxItemLevel(uint16 _maxItemLevel) external onlyOwner {
        maxItemLevel = _maxItemLevel;
    }
    
    function getMaxItemLevel() external view returns (uint16) {
        return maxItemLevel;
    }
}
