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
     })),
  on(filterActions.setFieldSearch,
     (state: FilterState,
      { query }) => ({
       ...state,
       filter: {
         ...state.filter,
         page: 0,
         search: query
       }
     }))
);

export function filterReducer(state: FilterState = initialStateFilter,
                              action: Action): FilterState {
  return _filterReducer(state, action);
}
