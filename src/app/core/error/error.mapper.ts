const errorMappings: Record<string, string> = {};

// Cryptoverse base contract errors
errorMappings['E-C1'] = 'You cannot perform this action because you are not an owner of the game';
errorMappings['E-C2'] = 'You have to send Ether to buy tokens';
errorMappings['E-C3'] = 'You need to send at least the current token price in Ether to buy some tokens';

// Item errors
errorMappings['E-I1'] = 'You are not the owner of this item';
errorMappings['E-I2'] = 'This is not an item you can buy';
errorMappings['E-I3'] = 'This item is too expensive for you';
errorMappings['E-I4'] = 'The upgrade is too expensive for you';
errorMappings['E-I5'] = 'This item has already reached maximum upgrade level - you cannot improve it further';

// Exploration errors
errorMappings['E-E1'] = 'You must be on the planets surface to perform this action';
errorMappings['E-E2'] = 'This is not a planet you can explore';
errorMappings['E-E3'] = 'You are already exploring a planet';
errorMappings['E-E4'] = 'You are still occupied and cannot perform this action yet - please wait a bit';


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
