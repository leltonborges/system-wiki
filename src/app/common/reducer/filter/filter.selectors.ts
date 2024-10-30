import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { FilterState } from './filter.reducer';

export const selectFilterState =
  createFeatureSelector<FilterState>('filter');

export const selectFilter =
  createSelector(selectFilterState,
                 (state: FilterState) => state.filter)
