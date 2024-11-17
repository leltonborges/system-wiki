import {
  Actions,
  createEffect,
  ofType
} from '@ngrx/effects';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../index';
import { ArticleService } from '../../service/article.service';
import { articleActions } from './article.actions';
import {
  exhaustMap,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs';
import { selectFilter } from '../filter/filter.selectors';
import { Filter } from '../../interface/filter';
import { LoadingService } from '@c/core/components/loading/loading.service';

function loadArticles(articleService: ArticleService,
                      loadingService: LoadingService,
                      filter: Filter) {
  loadingService.show();
  const articleObservable = filter.search
                            ? articleService.findAllSearch(filter)
                            : articleService.findAllByFilterPage(filter);
  return articleObservable.pipe(switchMap(async (articles) => articleActions.loadingArticlesSuccess({ articles })),
                                tap(() => loadingService.hide()));
}

const loadArticleEffect = createEffect(
  (actions$ = inject(Actions),
   store$ = inject(Store<AppState>),
   articleService = inject(ArticleService),
   loadingService = inject(LoadingService)) =>
    actions$.pipe(
      ofType(articleActions.loadArticles),
      withLatestFrom(store$.select(selectFilter)),
      exhaustMap(([action, filter]) => loadArticles(articleService, loadingService, filter))
    ),
  { functional: true }
)

export const articleEffects = { loadArticleEffect }
