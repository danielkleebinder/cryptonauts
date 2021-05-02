import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter} from '@ngrx/entity';
import {Planet} from '../models';
import {PlanetsState} from './planets.state';
import * as actions from './planets.actions';


export const adapter = createEntityAdapter<Planet>();
const initialState: PlanetsState = adapter.getInitialState({
  travelTime: 10,
  exploration: null,
  activePlanetId: null
});

const eventReducer = createReducer(initialState,
  on(actions.loadPlanetsSuccess, (state, {planets}) => adapter.upsertMany(planets, state)),
  on(actions.loadTravelTimeSuccess, (state, {travelTime}) => ({...state, travelTime})),
  on(actions.loadExplorerCountSuccess, (state, {planetId, explorerCount}) => adapter.updateOne({
    id: planetId,
    changes: {explorerCount}
  }, state)),
  on(actions.loadMyExplorationSuccess, (state, {exploration}) => ({...state, exploration})),
  on(actions.clearPlanets, (state) => adapter.removeAll(state)),
  on(actions.selectPlanet, (state, {planetId}) => ({...state, activePlanetId: planetId}))
);

export function reducer(state: PlanetsState | undefined, action: Action): PlanetsState {
  return eventReducer(state, action);
}
