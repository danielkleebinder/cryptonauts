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
