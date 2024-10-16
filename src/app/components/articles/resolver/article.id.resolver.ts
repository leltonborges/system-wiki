import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot
} from '@angular/router';
import { inject } from '@angular/core';
import { ArticleService } from '../../../common/service/article.service';
import {
  Observable,
  of
} from 'rxjs';
import { Article } from '@c/articles/model/article';

export const articleIdResolver: ResolveFn<Article> = (route: ActivatedRouteSnapshot,
                                                      state: RouterStateSnapshot): Observable<Article> => {
  const param: string = route.params['articleId'];
  if(param) return inject(ArticleService).findByID(param);
  else return of();
};
