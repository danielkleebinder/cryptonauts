import {Action, createReducer, on} from '@ngrx/store';
import {AdminState} from './admin.state';
import * as actions from './admin.actions';

const initialState: AdminState = {
  contractBalance: 0,
  owner: false
};

const adminReducer = createReducer(initialState,
  on(actions.loadContractBalanceSuccess, (state, {contractBalance}) => ({...state, contractBalance})),
  on(actions.loadOwnershipSuccess, (state, {owner}) => ({...state, owner}))
);

export function reducer(state: AdminState | undefined, action: Action): AdminState {
  return adminReducer(state, action);
}
