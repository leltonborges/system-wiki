import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageArticles } from '@c/articles/model/page-articles';
import { Article } from '@c/articles/model/article';
import { environment } from '../../../../environments/environment';

@Injectable({
              providedIn: 'root'
            })
export class ArticleService {

  private readonly API: string = environment.API_ARTICLE_URL;

  constructor(private readonly httpClient: HttpClient) {}

  findAllPage(page: number): Observable<PageArticles> {
    return this.httpClient.get<PageArticles>(`${ this.API }/articles?_page=${ page }&_per_page=25`);
  }

  findByID(id: string): Observable<Article> {
    return this.httpClient.get<Article>(`${ this.API }/articles/${ id }`);
  }

  save(article: Article): Observable<boolean> {
    if(article.id) return this.httpClient.put<boolean>(`${ this.API }/articles/${ article.id }`, article);
    else return this.httpClient.post<boolean>(`${ this.API }/articles`, article);
  }
}
