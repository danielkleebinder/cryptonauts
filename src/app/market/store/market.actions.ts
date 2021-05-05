import {createAction, props} from '@ngrx/store';
import {Item} from '../../inventory/models';


// Core market actions
export const loadMarket = createAction('[Market Page] Load market');
export const loadMarketSuccess = createAction('[Market API] Load market success', props<{ items: Item[] }>());
export const clearMarket = createAction('[Market Page] Clear market');

export const buyItem = createAction('[Market Page] Buy item', props<{ itemTypeId: number }>());
export const buyItemSuccess = createAction('[Market Page] Buy item success');

export const addItemType = createAction('[Admin Page] Add item type', props<{ newItem: Partial<Item> }>());
export const addItemTypeSuccess = createAction('[Admin API] Add item type success');

