import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot
} from '@angular/router';
import { inject } from '@angular/core';
import { ArticleService } from '../../../common/service/article.service';
import { Observable } from 'rxjs';
import { PageArticles } from '../model/page-articles';

export const articlesPageResolver: ResolveFn<PageArticles> = (route: ActivatedRouteSnapshot,
                                                              state: RouterStateSnapshot): Observable<PageArticles> => {
  return inject(ArticleService).findAllPage(1);
};
