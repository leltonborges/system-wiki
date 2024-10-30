import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ArticleComponent } from '@c/articles/article/article.component';
import {
  distinctUntilChanged,
  filter,
  Observable,
  Subject,
  take,
  takeUntil
} from 'rxjs';
import {
  AsyncPipe,
  NgIf
} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  MatPaginatorModule,
  PageEvent
} from '@angular/material/paginator';
import { IconSvgComponent } from '@c/core/components/icon-svg/icon-svg.component';
import { AppState } from '../../../common/reducer';
import { Store } from '@ngrx/store';
import { selectSearchQuery } from '../../../common/reducer/search/search.selectors';
import { searchActions } from '../../../common/reducer/search/search.actions';
import { articleSelectors } from '../../../common/reducer/article/article.selectors';
import { PageArticles } from '@c/articles/model/page-articles';

@Component({
             selector: 'cs-articles-list',
             standalone: true,
             imports: [
               ArticleComponent,
               MatPaginatorModule,
               AsyncPipe,
               NgIf,
               IconSvgComponent
             ],
             templateUrl: './article-list.component.html',
             styleUrl: './article-list.component.sass',
             providers: []
           })
export class ArticleListComponent
  implements OnInit,
             OnDestroy {
  articles$: Observable<PageArticles> = new Observable<PageArticles>();
  length: number = 50;
  readonly pageSizeOptions = [10, 25, 50];
  pageSize: number = 10;
  pageIndex: number = 0;
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly _activatedRoute: ActivatedRoute,
              private readonly _store$: Store<AppState>) {
    this.articles$ = this._store$.select(articleSelectors.selectArticle)
  }

  ngOnInit() {
    this.articles$.pipe(takeUntil(this.destroy$),
                        distinctUntilChanged((prev,
                                              curr) => prev.data === curr.data))
        .subscribe(result => {
          this.length = result.data.length;
          this.pageSize = result.data.length;
        })
    const paramSearch: string = this._activatedRoute.snapshot.queryParams['search'];
    this._store$.select(selectSearchQuery)
        .pipe(filter(value => !!paramSearch && value !== paramSearch),
              take(1))
        .subscribe(() => {
          this._store$.dispatch(searchActions.setSearchQuery({ query: paramSearch }));
        });
  }

  hasArticles(): boolean {
    return this.length > 0;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handlePageEvent(e: PageEvent) {
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }
}
