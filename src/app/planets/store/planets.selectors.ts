import {createFeatureSelector, createSelector} from '@ngrx/store';
import {adapter} from './planets.reducer';
import {PlanetsState} from './planets.state';


export const featureKey = 'planets';

const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();

export const selectFeature = createFeatureSelector<PlanetsState>(featureKey);

export const selectAllPlanets = createSelector(selectFeature, selectAll);
export const selectPlanetEntities = createSelector(selectFeature, selectEntities);
export const selectTravelTime = createSelector(selectFeature, (state) => state.travelTime);
export const selectMyExploration = createSelector(selectFeature, (state) => state.exploration);

export const selectActivePlanetId = createSelector(selectFeature, (state) => state.activePlanetId);
export const selectHasActivePlanet = createSelector(selectActivePlanetId, (planetId) => planetId != null);
export const selectActivePlanet = createSelector(
  selectPlanetEntities,
  selectActivePlanetId,
  (entities, id) => entities[id]);
