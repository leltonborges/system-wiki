import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot
} from '@angular/router';
import { inject } from '@angular/core';
import { ArticleService } from '../../../common/service/article.service';
import { Observable } from 'rxjs';
import { PageArticles } from '../model/page-articles';
import { Filter } from '../../../common/interface/Filter';
import moment from 'moment/moment';

export const articlesPageResolver: ResolveFn<PageArticles> = (route: ActivatedRouteSnapshot,
                                                              state: RouterStateSnapshot): Observable<PageArticles> => {
  const { title, author, startDate, endDate, page, pageSize } = route.queryParams;
  const filter: Filter = {
    title,
    author,
    startDate,
    endDate: endDate ?? moment().format('YYYYMM'),
    page: page ?? 0,
    pageSize: pageSize ?? 10
  }
  return inject(ArticleService).findAllPage(filter);
};
