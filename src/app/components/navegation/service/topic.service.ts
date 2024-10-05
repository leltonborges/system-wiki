import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TopicsNode } from '@c/navegation/modal/topic-node';

@Injectable({
              providedIn: 'root'
            })
export class TopicService {
  private API: string = environment.API_ARTICLE_URL;

  constructor(private _httpClient: HttpClient) { }

  getAllTopics(): Observable<TopicsNode> {
    return this._httpClient.get<TopicsNode>(`${ this.API }/topics`);
  }
}
