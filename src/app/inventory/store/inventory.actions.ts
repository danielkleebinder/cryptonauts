import {createAction, props} from '@ngrx/store';
import {Item} from '../models';


// Core item actions
export const loadInventory = createAction('[Inventory Page] Load inventory');
export const loadInventorySuccess = createAction('[Inventory API] Load inventory success', props<{ items: Item[] }>());
export const clearInventory = createAction('[Inventory Page] Clear inventory');

export const upgradeItem = createAction('[Inventory Page] Upgrade item', props<{ itemId: number }>());
export const upgradeItemSuccess = createAction('[Inventory API] Upgrade item success', props<{ itemId: number }>());
export const destroyItem = createAction('[Inventory Page] Destroy item', props<{ itemId: number }>());
export const destroyItemSuccess = createAction('[Inventory API] Destroy item success', props<{ itemId: number }>());

export const loadTokens = createAction('[Inventory Page] Load tokens');
export const loadTokensSuccess = createAction('[Inventory API] Load tokens success', props<{ tokens: number }>());
