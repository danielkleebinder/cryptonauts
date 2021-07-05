const errorMappings: Record<string, string> = {};

// Cryptoverse base contract errors
errorMappings['E-C1'] = 'You cannot perform this action because you are not an owner of the game';
errorMappings['E-C2'] = 'You have to send Ether to buy space diamonds';
errorMappings['E-C3'] = 'You need to send at least the current space diamond price in Ether to buy some';

// Astronaut errors
errorMappings['E-A1'] = 'You need more space diamonds energy to level up';
errorMappings['E-A2'] = 'You have to choose an upgrade property (mining, attack or defense)';

// Item errors
errorMappings['E-I1'] = 'You are not the owner of this item';
errorMappings['E-I2'] = 'You cannot perform this action while the item is equipped';
errorMappings['E-I3'] = 'This is not an item you can buy';
errorMappings['E-I4'] = 'This item is too expensive for you';
errorMappings['E-I5'] = 'This item was already destroyed';
errorMappings['E-I6'] = 'The upgrade is too expensive for you';
errorMappings['E-I7'] = 'This item has already reached maximum upgrade level - you cannot improve it further';
errorMappings['E-I8'] = 'You cannot equip more items - unequip one to equip a new one';
errorMappings['E-I9'] = 'This item is already unequipped';

// Exploration errors
errorMappings['E-E1'] = 'You must be on the planets surface to perform this action';
errorMappings['E-E2'] = 'This is not a planet you can explore';
errorMappings['E-E3'] = 'You are already exploring a planet - leave it to start a new exploration';
errorMappings['E-E4'] = 'You are still occupied and cannot perform this action yet - please wait a bit';
errorMappings['E-E5'] = 'You must be at least level 1 to explore a planet';

// Fight errors
errorMappings['E-F1'] = 'You and your opponent must be at least level 1 to fight each other';
errorMappings['E-F2'] = 'The level difference is too large';
errorMappings['E-F3'] = 'I know this player looks handsome and you want to fight him or her, but that is your own cryptonaut';


/**
 * Replaces all error codes with their corresponding descriptive text. Ethereum smart contracts are locked to max
 * 24 KB in size. Error codes allow to further reduce the size of the contract and allow for more logic.
 *
 * @param message Message to replace the error codes in.
 */
export function replaceErrorCodes(message: any): any {
  if (message == null || message.data == null) {
    return message;
  }
  const {data} = message;
  for (const key of Object.keys(data)) {
    if (data[key].hasOwnProperty('reason')) {
      const errorDescription = errorMappings[data[key].reason];
      return errorDescription != null ? errorDescription : message;
    }
  }
  return message;
}
