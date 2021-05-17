import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter} from '@ngrx/entity';
import {Item} from '../models';
import {InventoryState} from './inventory.state';
import * as actions from './inventory.actions';


export const adapter = createEntityAdapter<Item>();
const initialState: InventoryState = adapter.getInitialState({
  tokens: 0,
  tokenPrice: 100,
  playerBalance: 0
});

const inventoryReducer = createReducer(initialState,
  on(actions.loadInventorySuccess, (state, {items}) => adapter.upsertMany(items, state)),
  on(actions.loadPlayerBalanceSuccess, (state, {playerBalance}) => ({...state, playerBalance})),
  on(actions.loadTokensSuccess, (state, {tokens}) => ({...state, tokens})),
  on(actions.loadTokenPriceSuccess, (state, {tokenPrice}) => ({...state, tokenPrice})),
  on(actions.destroyItemSuccess, (state, {itemId}) => adapter.removeOne(itemId, state)),
  on(actions.clearInventory, (state) => adapter.removeAll(state))
);

export function reducer(state: InventoryState | undefined, action: Action): InventoryState {
  return inventoryReducer(state, action);
}
