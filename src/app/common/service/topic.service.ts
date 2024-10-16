import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TopicsNode } from '@c/navegation/modal/topic-node';

@Injectable({
              providedIn: 'root'
            })
export class TopicService {
  private readonly API: string = environment.API_ARTICLE_URL;

  constructor(private readonly _httpClient: HttpClient) { }

  getAllTopics(): Observable<TopicsNode> {
    return this._httpClient.get<TopicsNode>(`${ this.API }/topics`);
  }
}
