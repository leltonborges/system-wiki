import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { ArticleState } from './article.reducer';

export const selectArticleState
  = createFeatureSelector<ArticleState>('article');

const selectArticle =
  createSelector(selectArticleState,
                 (state: ArticleState) => state.articles);

export const articleSelectors = { selectArticle }
