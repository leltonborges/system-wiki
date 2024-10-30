import {
  Action,
  createReducer,
  on
} from '@ngrx/store';
import { searchActions } from './search.actions';

export interface SearchState {
  query: string;
}

export const initialState: SearchState = { query: '' };

const _searchReducer = createReducer(
  initialState,
  on(searchActions.setSearchQuery,
     (state,
      { query }) => ({ ...state, query }))
)

export function searchReducer(state: SearchState = initialState,
                              action: Action): SearchState {
  return _searchReducer(state, action);
}
