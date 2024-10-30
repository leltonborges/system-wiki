import {
  searchReducer,
  SearchState
} from './search/search.reducer';
import { ActionReducerMap } from '@ngrx/store';
import {
  filterReducer,
  FilterState
} from './filter/filter.reducer';
import {
  articleReducer,
  ArticleState
} from './article/article.reducer';

export interface AppState {
  search: SearchState;
  filter: FilterState;
  article: ArticleState;
}

export const reducers: ActionReducerMap<AppState> = {
  search: searchReducer,
  filter: filterReducer,
  article: articleReducer
}
