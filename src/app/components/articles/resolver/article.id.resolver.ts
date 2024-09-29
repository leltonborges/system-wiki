import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot
} from '@angular/router';
import { inject } from '@angular/core';
import { ArticleService } from '@c/articles/service/article.service';
import {
  Observable,
  of
} from 'rxjs';
import { PageArticles } from '../model/page-articles';
import { Article } from '@c/articles/model/article';

export const articleIdResolver: ResolveFn<Article> = (route: ActivatedRouteSnapshot,
                                                      state: RouterStateSnapshot): Observable<Article> => {
  const param: string = route.params['id'];
  if(param) return inject(ArticleService).findByID(param);
  else return of();
};
