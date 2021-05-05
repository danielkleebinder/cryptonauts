import {createFeatureSelector, createSelector} from '@ngrx/store';
import {adapter} from './inventory.reducer';
import {InventoryState} from './inventory.state';


export const featureKey = 'inventory';

const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();

export const selectFeature = createFeatureSelector<InventoryState>(featureKey);

export const selectInventory = createSelector(selectFeature, selectAll);
export const selectTokens = createSelector(selectFeature, (state) => state.tokens);
