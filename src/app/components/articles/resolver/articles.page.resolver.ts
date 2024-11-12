import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot
} from '@angular/router';
import { inject } from '@angular/core';
import {
  Observable,
  take
} from 'rxjs';
import { PageArticles } from '../model/page-articles';
import { Store } from '@ngrx/store';
import { AppState } from '../../../common/reducer';
import { articleActions } from '../../../common/reducer/article/article.actions';
import { articleSelectors } from '../../../common/reducer/article/article.selectors';

export const articlesPageResolver: ResolveFn<PageArticles> = (route: ActivatedRouteSnapshot,
                                                              state: RouterStateSnapshot): Observable<PageArticles> => {
  const store$ = inject(Store<AppState>);
  store$.dispatch(articleActions.loadArticles())
  return store$.select(articleSelectors.selectArticle)
               .pipe(take(1))
};
