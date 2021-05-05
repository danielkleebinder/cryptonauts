import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter} from '@ngrx/entity';
import {Item} from '../../inventory/models';
import {MarketState} from './market.state';
import * as actions from './market.actions';


export const adapter = createEntityAdapter<Item>();
const initialState: MarketState = adapter.getInitialState();

const marketReducer = createReducer(initialState,
  on(actions.loadMarketSuccess, (state, {items}) => adapter.upsertMany(items, state)),
  on(actions.clearMarket, (state) => adapter.removeAll(state))
);

export function reducer(state: MarketState | undefined, action: Action): MarketState {
  return marketReducer(state, action);
}
