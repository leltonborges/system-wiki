import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot
} from '@angular/router';
import { inject } from '@angular/core';
import { ArticleService } from '../../../common/service/article.service';
import { Observable } from 'rxjs';
import { PageArticles } from '../model/page-articles';
import { Filter } from '../../../common/interface/filter';
import { SearchListenerService } from '../../../common/service/search-listener.service';

export const articlesPageResolver: ResolveFn<PageArticles> = (route: ActivatedRouteSnapshot,
                                                              state: RouterStateSnapshot): Observable<PageArticles> => {
  const articleService = inject(ArticleService);
  const searchListenerService = inject(SearchListenerService);
  const { title, author, tag, startDate, endDate, page, pageSize, search } = route.queryParams;
  const filter: Filter = {
    title,
    authorName: author,
    tagId: tag,
    startDate,
    endDate,
    page,
    pageSize
  }

  if(search) {
    searchListenerService.debounce$.next(search)
    return articleService.findAllSearch(filter)
  }

  return articleService.findAllByFilterPage(filter);
};
