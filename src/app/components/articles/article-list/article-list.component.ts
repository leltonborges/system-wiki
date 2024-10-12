import {
  Component,
  OnInit
} from '@angular/core';
import { ArticleComponent } from '@c/articles/article/article.component';
import { ArticleService } from '@c/articles/service/article.service';
import { Articles } from '@c/articles/model/article';
import {
  BehaviorSubject,
  map
} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PageArticles } from '@c/articles/model/page-articles';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
             selector: 'cs-articles-list',
             standalone: true,
             imports: [
               ArticleComponent,
               AsyncPipe,
               MatSidenavModule,
               MatSelectModule,
               MatInputModule,
               MatFormFieldModule
             ],
             templateUrl: './article-list.component.html',
             styleUrl: './article-list.component.sass'
           })
export class ArticleListComponent
  implements OnInit {

  private readonly _articles$: BehaviorSubject<Articles> = new BehaviorSubject<Articles>([]);

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
}
