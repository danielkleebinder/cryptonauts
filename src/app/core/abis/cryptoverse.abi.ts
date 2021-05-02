export const cryptoverseAbi: any[] = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "newLevel",
        "type": "uint32"
      }
    ],
    "name": "AstronautLevelUp",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "itemId",
        "type": "uint256"
      }
    ],
    "name": "ItemBought",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "destroyer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "itemId",
        "type": "uint256"
      }
    ],
    "name": "ItemDestroyed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "itemId",
        "type": "uint256"
      }
    ],
    "name": "ItemTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "itemTypeId",
        "type": "uint256"
      }
    ],
    "name": "ItemTypeCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "itemId",
        "type": "uint256"
      }
    ],
    "name": "ItemUpgraded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "MinterAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "MinterRemoved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "OwnerAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "OwnerRemoved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "planetId",
        "type": "uint256"
      }
    ],
    "name": "PlanetCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "explorer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "planetId",
        "type": "uint256"
      }
    ],
    "name": "PlanetExplorerArrived",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "explorer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "planetId",
        "type": "uint256"
      }
    ],
    "name": "PlanetExplorerLeft",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "explorer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "resources",
        "type": "uint256"
      }
    ],
    "name": "PlanetResourcesCollected",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "val",
        "type": "uint256"
      }
    ],
    "name": "ReceivedEther",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "addMinter",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_account",
        "type": "address"
      }
    ],
    "name": "addOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "astronauts",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "level",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "winCount",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "lossCount",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "health",
        "type": "uint32"
      },
      {
        "internalType": "uint16",
        "name": "mining",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "attack",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "defense",
        "type": "uint16"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "burn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_itemTypeId",
        "type": "uint256"
      }
    ],
    "name": "buyItem",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "buyTokens",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "collectMinedPlanetResources",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "uint16",
        "name": "_mining",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "_attack",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "_defense",
        "type": "uint16"
      },
      {
        "internalType": "uint64",
        "name": "_cost",
        "type": "uint64"
      }
    ],
    "name": "createItemType",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_itemId",
        "type": "uint256"
      }
    ],
    "name": "destroyItem",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "explorations",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "planetId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "startTime",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "exploring",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_planetId",
        "type": "uint256"
      }
    ],
    "name": "explorePlanet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "explorerCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_opponent",
        "type": "address"
      }
    ],
    "name": "fight",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAstronaut",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint32",
            "name": "level",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "winCount",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "lossCount",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "health",
            "type": "uint32"
          },
          {
            "internalType": "uint16",
            "name": "mining",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "attack",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "defense",
            "type": "uint16"
          }
        ],
        "internalType": "struct CryptoverseAstronauts.Astronaut",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAstronautLevelUpCost",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAstronauts",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint32",
            "name": "level",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "winCount",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "lossCount",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "health",
            "type": "uint32"
          },
          {
            "internalType": "uint16",
            "name": "mining",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "attack",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "defense",
            "type": "uint16"
          }
        ],
        "internalType": "struct CryptoverseAstronauts.Astronaut[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getItemTypes",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint16",
            "name": "level",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "mining",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "attack",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "defense",
            "type": "uint16"
          },
          {
            "internalType": "uint64",
            "name": "cost",
            "type": "uint64"
          },
          {
            "internalType": "bool",
            "name": "destroyed",
            "type": "bool"
          }
        ],
        "internalType": "struct CryptoverseItems.Item[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "getItemsByOwner",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint16",
            "name": "level",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "mining",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "attack",
            "type": "uint16"
          },
          {
            "internalType": "uint16",
            "name": "defense",
            "type": "uint16"
          },
          {
            "internalType": "uint64",
            "name": "cost",
            "type": "uint64"
          },
          {
            "internalType": "bool",
            "name": "destroyed",
            "type": "bool"
          }
        ],
        "internalType": "struct CryptoverseItems.Item[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMaxItemLevel",
    "outputs": [
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMyExploration",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "planetId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "startTime",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "exploring",
            "type": "bool"
          }
        ],
        "internalType": "struct CryptoverseExploration.Exploration",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getPlanets",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint64",
            "name": "age",
            "type": "uint64"
          },
          {
            "internalType": "uint32",
            "name": "radius",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "temperature",
            "type": "uint32"
          },
          {
            "internalType": "uint256",
            "name": "mass",
            "type": "uint256"
          }
        ],
        "internalType": "struct CryptoversePlanets.Planet[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getRequiredTravelTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTokenPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_player",
        "type": "address"
      }
    ],
    "name": "getTotalPlayerStats",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "attack",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "defense",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_itemTypeId",
        "type": "uint256"
      }
    ],
    "name": "isItemType",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "isMinter",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isOwner",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_planetId",
        "type": "uint256"
      }
    ],
    "name": "isPlanet",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "itemTypes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint16",
        "name": "level",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "mining",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "attack",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "defense",
        "type": "uint16"
      },
      {
        "internalType": "uint64",
        "name": "cost",
        "type": "uint64"
      },
      {
        "internalType": "bool",
        "name": "destroyed",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "items",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint16",
        "name": "level",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "mining",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "attack",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "defense",
        "type": "uint16"
      },
      {
        "internalType": "uint64",
        "name": "cost",
        "type": "uint64"
      },
      {
        "internalType": "bool",
        "name": "destroyed",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "leavePlanet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "levelUpAstronaut",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_itemId",
        "type": "uint256"
      }
    ],
    "name": "levelUpItem",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "planets",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint64",
        "name": "age",
        "type": "uint64"
      },
      {
        "internalType": "uint32",
        "name": "radius",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "temperature",
        "type": "uint32"
      },
      {
        "internalType": "uint256",
        "name": "mass",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "redeem",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceMinter",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_levelUpFactor",
        "type": "uint256"
      }
    ],
    "name": "setLevelUpFactor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint16",
        "name": "_maxItemLevel",
        "type": "uint16"
      }
    ],
    "name": "setMaxItemLevel",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_requiredTravelTime",
        "type": "uint256"
      }
    ],
    "name": "setRequiredTravelTime",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
      }
    ],
    "name": "setTokenPrice",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_newOwner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_itemId",
        "type": "uint256"
      }
    ],
    "name": "transferItemTo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
];
