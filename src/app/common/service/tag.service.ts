import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  map,
  Observable
} from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Tags,
  TagsPage
} from '@c/navegation/model/tag';

@Injectable({
              providedIn: 'root'
            })
export class TagService {
  private readonly API: string = environment.API_ARTICLE_URL;

  constructor(private readonly _httpClient: HttpClient) { }

  findAllTags(): Observable<Tags> {
    const url = `${ this.API }/tag/list/status/1?size=50`;
    return this._httpClient.get<TagsPage>(url).pipe(map(result => result.data));
  }
}
