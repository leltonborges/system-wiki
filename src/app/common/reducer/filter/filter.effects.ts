import {
  Actions,
  createEffect,
  ofType
} from '@ngrx/effects';
import { inject } from '@angular/core';
import { filterActions } from './filter.actions';
import { exhaustMap } from 'rxjs';
import { articleActions } from '../article/article.actions';

const loadArticleUpdateFilter = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(ofType(filterActions.setFilterAction),
                  exhaustMap(() => [articleActions.loadArticles()])
    ),
  { functional: true }
)

const loadArticleUpdateSearch = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(ofType(filterActions.setFieldSearch),
                  exhaustMap(() => [articleActions.loadArticles()])
    ),
  { functional: true }
)

export const filterEffects = {
  loadArticleUpdateFilter,
  loadArticleUpdateSearch
}
