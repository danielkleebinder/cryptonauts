import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter} from '@ngrx/entity';
import {Astronaut} from '../models';
import {AstronautState} from './astronaut.state';
import * as actions from './astronaut.actions';


export const adapter = createEntityAdapter<Astronaut>();
const initialState: AstronautState = adapter.getInitialState({
  me: null,
  levelUpCost: 0
});

const astronautReducer = createReducer(initialState,
  on(actions.loadAstronautsSuccess, (state, {astronauts}) => adapter.upsertMany(astronauts, state)),
  on(actions.loadLevelUpCostSuccess, (state, {levelUpCost}) => ({...state, levelUpCost})),
  on(actions.loadMyAstronautSuccess, (state, {me}) => ({...state, me})),
  on(actions.clearAstronauts, (state) => adapter.removeAll(state))
);

export function reducer(state: AstronautState | undefined, action: Action): AstronautState {
  return astronautReducer(state, action);
}
