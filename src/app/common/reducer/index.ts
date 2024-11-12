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
  filter: FilterState;
  article: ArticleState;
}

export const reducers: ActionReducerMap<AppState> = {
  filter: filterReducer,
  article: articleReducer
}
