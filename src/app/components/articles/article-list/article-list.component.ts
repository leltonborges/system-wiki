import {
  Component,
  OnInit
} from '@angular/core';
import { ArticleComponent } from '@c/articles/article/article.component';
import { ArticleService } from '../../../common/service/article.service';
import { Articles } from '@c/articles/model/article';
import {
  BehaviorSubject,
  map
} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PageArticles } from '@c/articles/model/page-articles';
import {
  MatPaginatorModule,
  PageEvent
} from '@angular/material/paginator';


@Component({
             selector: 'cs-articles-list',
             standalone: true,
             imports: [
               ArticleComponent,
               MatPaginatorModule,
               AsyncPipe
             ],
             templateUrl: './article-list.component.html',
             styleUrl: './article-list.component.sass',
             providers: []
           })
export class ArticleListComponent
  implements OnInit {
  private readonly _articles$: BehaviorSubject<Articles> = new BehaviorSubject<Articles>([]);
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  readonly pageSizeOptions = [10, 25, 50];


  constructor(private readonly articleService: ArticleService,
              private readonly activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute
        .data
        .pipe(map(data => data['articles']))
        .subscribe({
                     next: (result: PageArticles) => {
                       this._articles$.next(result.data);
                     }
                   })
  }

  get articles$(): BehaviorSubject<Articles> {
    return this._articles$;
  }

  handlePageEvent(e: PageEvent) {
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }
}
