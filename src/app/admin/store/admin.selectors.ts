import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AdminState} from './admin.state';


export const featureKey = 'admin';

export const selectFeature = createFeatureSelector<AdminState>(featureKey);
export const selectContractBalance = createSelector(selectFeature, (state) => state.contractBalance);
export const selectIsOwner = createSelector(selectFeature, (state) => state.owner);
