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
  from,
  Subject,
  switchMap,
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
  }

  private validateSearchInput() {
    return tap((vl: string) => {
      if(!vl || vl.length < 5) {
        this.inputSearch.reset();
        this._route.navigate(['/']).catch(console.error)
      }
    });
  }

  private async searchArticles(): Promise<boolean> {
    const filterParams = await firstValueFrom(this._store.select(selectFilter));
    return this._route.navigate(['/article', 'list'], { queryParams: filterParams });
  }

  private listenForInputChanges() {
    this.inputSearch
        .valueChanges
        .pipe(
          debounceTime(3000),
          this.validateSearchInput(),
          takeUntil(this.destroy$),
          filter(() => !this.isUpdating),
          distinctUntilChanged(),
          switchMap(value => {
            this.isUpdating = true;
            this._store.dispatch(filterActions.setFieldSearch({ query: value }));
            return from(this.searchArticles());
          })
        )
        .subscribe({
                     next: () => {
                       this.isUpdating = false;
                       this.listener();
                     },
                     error: console.error
                   });
  }

  private loadSearchResults() {
    this._store.select(selectFilter)
        .pipe(
          debounceTime(3000),
          takeUntil(this.destroy$),
          distinctUntilChanged((prev,
                                curr) => prev.search === curr.search)
        )
        .subscribe(res => {
          if(!this.isUpdating) {
            this.isUpdating = true;
            this.inputSearch.setValue(res.search, { emitEvent: false }); // Evite loops acionando `emitEvent: false`
            this.isUpdating = false;
            this.searchArticles().then(this.listener).catch(console.error);
          }
        });
  }
}
