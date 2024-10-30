import {
  createReducer,
  on
} from '@ngrx/store';
import { articleActions } from './article.actions';
import { PageArticles } from '@c/articles/model/page-articles';

enum ArticleStatus {
  loading = 'loading',
  pending = 'pending',
  error = 'error',
  success = 'success',
}

export interface ArticleState {
  articles: PageArticles;
  error: '' | null;
  status: ArticleStatus;
}

const initArticlePage: PageArticles = {
  data: [],
  currentPage: 0,
  totalPages: 0,
  totalCount: 0
}

const initState: ArticleState = {
  articles: initArticlePage,
  error: null,
  status: ArticleStatus.pending
}

export const articleReducer = createReducer(
  initState,
  on(articleActions.loadArticles, (stateCurrent) => {
    return {
      ...stateCurrent,
      status: ArticleStatus.loading
    }
  }),
  on(articleActions.loadingArticlesSuccess,
     (current,
      { articles }) => {
       return {
         ...current,
         status: ArticleStatus.success,
         articles
       }
     })
)
