import {createAction, props} from '@ngrx/store';
import {Item} from '../../inventory/models';

export const addOwner = createAction('[Admin Page] Add owner', props<{ address: string }>());
export const renounceOwner = createAction('[Admin Page] Renounce owner');
export const redeemEther = createAction('[Admin Page] Redeem contract ether');

export const loadContractBalance = createAction('[Admin Page] Load contract balance');
export const loadContractBalanceSuccess = createAction('[Admin API] Load contract balance success', props<{ contractBalance: number }>());

export const loadOwnership = createAction('[Admin Page] Load ownership');
export const loadOwnershipSuccess = createAction('[Admin API] Load ownership success', props<{ owner: boolean }>());

export const addItemType = createAction('[Admin Page] Add item type', props<{ newItem: Partial<Item> }>());
export const addItemTypeSuccess = createAction('[Admin API] Add item type success');

export const setTokenPrice = createAction('[Admin Page] Set token price', props<{ tokenPrice: number }>());
export const setLevelUpFactor = createAction('[Admin Page] Set level up factor', props<{ levelUpFactor: number }>());
export const setTravelTime = createAction('[Admin Page] Set travel time', props<{ travelTime: number }>());
