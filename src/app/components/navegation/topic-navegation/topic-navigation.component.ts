import {
  Component,
  OnInit
} from '@angular/core';
import { TopicService } from '../../../common/service/topic.service';
import { BehaviorSubject } from 'rxjs';
import { TopicsNode } from '@c/navegation/modal/topic-node';

@Component({
             selector: 'cs-topic-navigation',
             standalone: true,
             imports: [],
             templateUrl: './topic-navigation.component.html',
             styleUrl: './topic-navigation.component.sass'
           })
export class TopicNavigationComponent
  implements OnInit {
  private topics$ = new BehaviorSubject<TopicsNode>([]);

  constructor(private _topicService: TopicService) {}

  ngOnInit(): void {
    this._topicService
        .getAllTopics()
      // .pipe(tap(console.log))
        .subscribe(result => this.topics$.next(result));
  }

  private mountTree() {
    const value = this.topics$.getValue();
  }

}
