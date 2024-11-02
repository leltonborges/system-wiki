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
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  MatPaginatorModule,
  PageEvent
} from '@angular/material/paginator';
import { IconSvgComponent } from '@c/core/components/icon-svg/icon-svg.component';
import { AppState } from '../../../common/reducer';
import { Store } from '@ngrx/store';
import { selectSearchQuery } from '../../../common/reducer/search/search.selectors';
import { articleSelectors } from '../../../common/reducer/article/article.selectors';
import { PageArticles } from '@c/articles/model/page-articles';
import { filterActions } from '../../../common/reducer/filter/filter.actions';
import { articleActions } from '../../../common/reducer/article/article.actions';
import { selectFilter } from '../../../common/reducer/filter/filter.selectors';

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
  length: number = 10;
  readonly pageSizeOptions = [10, 25, 50];
  pageSize: number = 10;
  pageIndex: number = 0;
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly _activatedRoute: ActivatedRoute,
              private readonly _router: Router,
              private readonly _store$: Store<AppState>) {
    this.articles$ = this._store$.select(articleSelectors.selectArticle)
  }

  ngOnInit() {
    this.articles$.pipe(takeUntil(this.destroy$),
                        distinctUntilChanged((prev,
                                              curr) => prev.data === curr.data))
        .subscribe(result => {
          console.log('result: ', result)
          this.length = result.totalCount;
          this.pageIndex = result.currentPage;
        })
    const paramSearch: string = this._activatedRoute.snapshot.queryParams['search'];
    this._store$.select(selectSearchQuery)
        .pipe(filter(value => !!paramSearch && value !== paramSearch),
              take(1))
        .subscribe(() => {
          this._store$.dispatch(filterActions.setFieldSearch({ query: paramSearch }));
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
    this._store$.select(selectFilter)
        .pipe(take(1))
        .subscribe(filter => {
          const updatedFilter = {
            ...filter,
            page: e.pageIndex,
            pageSize: e.pageSize
          };
          console.table(updatedFilter)
          this._store$.dispatch(filterActions.setFilterAction({ filter: updatedFilter }));
          this._store$.dispatch(articleActions.loadArticles());
          this._router.navigate(['article/list'],
                                {
                                  queryParams: updatedFilter,
                                  queryParamsHandling: 'merge',
                                  replaceUrl: true
                                })
              .catch(console.error);
        });
  }
}
