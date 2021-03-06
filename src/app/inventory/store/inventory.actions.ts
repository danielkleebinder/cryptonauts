import {createAction, props} from '@ngrx/store';
import {Item} from '../models';


// Core item actions
export const loadInventory = createAction('[Inventory Page] Load inventory');
export const loadInventorySuccess = createAction('[Inventory API] Load inventory success', props<{ items: Item[] }>());
export const clearInventory = createAction('[Inventory Page] Clear inventory');

export const loadPlayerBalance = createAction('[Admin Page] Load player balance');
export const loadPlayerBalanceSuccess = createAction('[Admin API] Load player balance success', props<{ playerBalance: number }>());

export const upgradeItem = createAction('[Inventory Page] Upgrade item', props<{ itemId: number }>());
export const upgradeItemSuccess = createAction('[Inventory API] Upgrade item success', props<{ itemId: number }>());
export const destroyItem = createAction('[Inventory Page] Destroy item', props<{ itemId: number }>());
export const destroyItemSuccess = createAction('[Inventory API] Destroy item success', props<{ itemId: number }>());

export const equipItem = createAction('[Inventory Page] Equip item', props<{ itemId: number }>());
export const equipItemSuccess = createAction('[Inventory Page] Equip item success');
export const unequipItem = createAction('[Inventory Page] Unequip item', props<{ itemId: number }>());
export const unequipItemSuccess = createAction('[Inventory Page] Unequip item success');

export const buyTokens = createAction('[Inventory Page] Buy tokens', props<{ wei: number }>());
export const loadTokens = createAction('[Inventory Page] Load tokens');
export const loadTokensSuccess = createAction('[Inventory API] Load tokens success', props<{ tokens: number }>());
export const loadTokenPrice = createAction('[Inventory Page] Load token price');
export const loadTokenPriceSuccess = createAction('[Inventory API] Load token price success', props<{ tokenPrice: number }>());
