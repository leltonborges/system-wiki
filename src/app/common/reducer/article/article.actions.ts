import {
  createAction,
  props
} from '@ngrx/store';
import { PageArticles } from '@c/articles/model/page-articles';

export const articleActions = {
  loadingArticlesSuccess: createAction('[Article] Loading Articles Success', props<{ articles: PageArticles }>()),
  loadArticles: createAction('[Article] Load Articles')
}
