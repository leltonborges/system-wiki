import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageArticles } from '@c/articles/model/page-articles';
import { ArticleDetail } from '@c/articles/model/article-detail';
import { environment } from '../../../environments/environment';
import { Filter } from '../interface/Filter';
import { ArticleNew } from '@c/articles/model/article-new';

@Injectable({
              providedIn: 'root'
            })
export class ArticleService {

  private readonly API: string = environment.API_ARTICLE_URL;

  constructor(private readonly httpClient: HttpClient) {}

  findAllPage(filter: Filter): Observable<PageArticles> {
    return this.httpClient.get<PageArticles>(`${ this.API }/article/list/status/1?page=${ filter.page }&size=${ filter.pageSize }`);
  }

  findByID(id: string): Observable<ArticleDetail> {
    return this.httpClient.get<ArticleDetail>(`${ this.API }/article/${ id }`);
  }

  save(article: ArticleNew): Observable<ArticleDetail> {
    return this.httpClient.post<ArticleDetail>(`${ this.API }/articles`, article);
  }

  update(idArticle: string,
         article: ArticleNew): Observable<ArticleDetail> {
    return this.httpClient.put<ArticleDetail>(`${ this.API }/articles/${ idArticle }`, article);
  }
}
