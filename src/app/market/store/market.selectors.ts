import {createFeatureSelector, createSelector} from '@ngrx/store';
import {adapter} from './market.reducer';
import {MarketState} from './market.state';


export const featureKey = 'market';

const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();

export const selectFeature = createFeatureSelector<MarketState>(featureKey);

export const selectMarket = createSelector(selectFeature, selectAll);
export const selectMarketItemCount = createSelector(selectFeature, selectTotal);

export const selectMarketEmpty = createSelector(selectMarketItemCount, (total) => total <= 0);
