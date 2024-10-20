import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Tags } from '@c/navegation/model/tag';

@Injectable({
              providedIn: 'root'
            })
export class TagService {
  private readonly API: string = environment.API_ARTICLE_URL;

  constructor(private readonly _httpClient: HttpClient) { }

  findAllTags(): Observable<Tags> {
    const url = `${ this.API }/tags`;
    return this._httpClient.get<Tags>(url);
  }
}
