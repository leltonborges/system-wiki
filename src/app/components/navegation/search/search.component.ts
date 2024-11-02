import {
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  firstValueFrom,
  Subject,
  takeUntil,
  tap
} from 'rxjs';
import { Router } from '@angular/router';
import {
  NgIf,
  NgTemplateOutlet
} from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import { AppState } from '../../../common/reducer';
import { filterActions } from '../../../common/reducer/filter/filter.actions';
import { selectFilter } from '../../../common/reducer/filter/filter.selectors';

@Component({
             selector: 'cs-search',
             standalone: true,
             imports: [
               ReactiveFormsModule,
               MatTooltipModule,
               MatIcon,
               NgIf,
               NgTemplateOutlet
             ],
             templateUrl: './search.component.html',
             styleUrl: './search.component.sass'
           })
export class SearchComponent
  implements OnInit,
             OnDestroy {
  readonly debounce$: Subject<string> = new Subject<string>();
  private readonly destroy$ = new Subject<void>();
  readonly inputSearch = new FormControl();
  @Input({ alias: 'modal' })
  isModal: boolean = false;
  private isUpdating: boolean = false;
  @Input() listener!: () => void;

  constructor(private readonly _route: Router,
              private readonly _store: Store<AppState>) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.loadSearchResults();
    this.listenForInputChanges();
    this.debounce$.pipe(debounceTime(3000),
                        tap(vl => {
                          if(!vl || vl.length < 5) {
                            this.inputSearch.reset();
                            this._route.navigate(['/']).catch(console.error)
                          }
                        }),
                        filter(res => !!res && res.length >= 5)
    )
        .subscribe(() => {
          this.searchArticles().then(this.listener).catch(console.error)
        });
  }

  private async searchArticles(): Promise<boolean> {
    const filterParams = await firstValueFrom(this._store.select(selectFilter));
    return this._route.navigate(['/article', 'list'], { queryParams: filterParams });
  }

  private listenForInputChanges() {
    this.inputSearch
        .valueChanges
        .pipe(takeUntil(this.destroy$),
              filter(() => !this.isUpdating),
              distinctUntilChanged())
        .subscribe(value => {
          this._store.dispatch(filterActions.setFieldSearch({ query: this.inputSearch.value }));

        })
  }

  private loadSearchResults() {
    this._store.select(selectFilter)
        .pipe(takeUntil(this.destroy$),
              distinctUntilChanged((prev,
                                    curr) => prev.search === curr.search))
        .subscribe(res => {
          this.isUpdating = true;
          this.inputSearch.setValue(res.search);
          this.isUpdating = false;
        })
  }

}
