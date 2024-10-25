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
import { ArticleDetail } from '@c/articles/model/article-detail';

export const articleIdResolver: ResolveFn<ArticleDetail> = (route: ActivatedRouteSnapshot,
                                                            state: RouterStateSnapshot): Observable<ArticleDetail> => {
  const param: string = route.params['articleId'];
  if(param) return inject(ArticleService).findByID(param);
  else return of();
};
