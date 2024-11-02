import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    const url = `${ this.API }/article/list/status/1?page=${ filter.page }&size=${ filter.pageSize }`;
    return this.httpClient.get<PageArticles>(url);
  }

  findAllSearch(filter: Filter): Observable<PageArticles> {
    const url = `${ this.API }/article/search?keyword=${ filter.search }&page=${ filter.page }&size=${ filter.pageSize }`;
    return this.httpClient.get<PageArticles>(url);
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
