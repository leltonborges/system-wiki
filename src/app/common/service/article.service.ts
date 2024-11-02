import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import {
  EMPTY,
  Observable
} from 'rxjs';
import { PageArticles } from '@c/articles/model/page-articles';
import { ArticleDetail } from '@c/articles/model/article-detail';
import { environment } from '../../../environments/environment';
import { Filter } from '../interface/filter';
import { ArticleNew } from '@c/articles/model/article-new';

@Injectable({
              providedIn: 'root'
            })
export class ArticleService {

  private readonly API: string = environment.API_ARTICLE_URL;

  constructor(private readonly httpClient: HttpClient) {}

  findAllByFilterPage(filter: Filter): Observable<PageArticles> {
    const cleanFilter = Object.fromEntries(
      Object.entries(filter).filter(([_, value]) => value != null)
    );

    const params = new HttpParams({
                                    fromObject: cleanFilter
                                  });
    const url = `${ this.API }/article/list/status/1`;
    return this.httpClient.get<PageArticles>(url, { params });
  }

  findAllSearch(filter: Filter): Observable<PageArticles> {
    if(!filter.search || filter.search.trim() === '') return EMPTY;
    const params = new HttpParams().set('page', filter.page)
                                   .set('pageSize', filter.pageSize)
                                   .set('keyword', filter.search);
    const url = `${ this.API }/article/search`;
    return this.httpClient.get<PageArticles>(url, { params });
  }

  findByID(id: string): Observable<ArticleDetail> {
    return this.httpClient.get<ArticleDetail>(`${ this.API }/article/${ id }`);
  }

  save(article: ArticleNew): Observable<ArticleDetail> {
    return this.httpClient.post<ArticleDetail>(`${ this.API }/article/save`, article);
  }

  update(idArticle: string,
         article: ArticleNew): Observable<ArticleDetail> {
    return this.httpClient.put<ArticleDetail>(`${ this.API }/article/${ idArticle }/update`, article);
  }
}
