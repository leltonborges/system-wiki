import {
  Filter,
  filterDefault
} from '../../interface/filter';
import {
  Action,
  createReducer,
  on
} from '@ngrx/store';
import { filterActions } from './filter.actions';


export interface FilterState {
  filter: Filter;
}

export const initialStateFilter: FilterState = { filter: filterDefault };

const _filterReducer = createReducer(
  initialStateFilter,
  on(filterActions.setFilterAction,
     (state: FilterState,
      { filter }) => ({
       ...state,
       filter
     }))
);

export function filterReducer(state: FilterState = initialStateFilter,
                              action: Action): FilterState {
  return _filterReducer(state, action);
}
