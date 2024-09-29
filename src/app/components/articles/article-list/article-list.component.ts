import {
  Component,
  OnInit
} from '@angular/core';
import { ArticleComponent } from '@c/articles/article/article.component';
import { ArticleService } from '@c/articles/service/article.service';
import {
  Article,
  Articles
} from '@c/articles/model/article';
import {
  BehaviorSubject,
  map
} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toMap } from 'ckeditor5';
import { PageArticles } from '@c/articles/model/page-articles';

@Component({
             selector: 'cs-articles-list',
             standalone: true,
             imports: [
               ArticleComponent,
               AsyncPipe
             ],
             templateUrl: './article-list.component.html',
             styleUrl: './article-list.component.sass'
           })
export class ArticleListComponent
  implements OnInit {

  constructor(private articleService: ArticleService,
              private activatedRoute: ActivatedRoute) {}

  private _articles$: BehaviorSubject<Articles> = new BehaviorSubject<Articles>([]);

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
}
