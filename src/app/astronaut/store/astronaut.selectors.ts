import {createFeatureSelector, createSelector} from '@ngrx/store';
import {adapter} from './astronaut.reducer';
import {AstronautState} from './astronaut.state';


export const featureKey = 'astronauts';

const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();

export const selectFeature = createFeatureSelector<AstronautState>(featureKey);

export const selectAstronauts = createSelector(selectFeature, selectAll);
export const selectAstronautCount = createSelector(selectFeature, selectTotal);
export const selectMe = createSelector(selectFeature, (state) => state.me);
export const selectLevelUpCost = createSelector(selectFeature, (state) => state.levelUpCost);
