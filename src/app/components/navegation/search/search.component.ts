import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import {
  debounceTime,
  filter,
  Subject,
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
import { selectSearchQuery } from '../../../common/reducer/search/search.selectors';
import { searchActions } from '../../../common/reducer/search/search.actions';

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
             OnChanges {
  readonly inputSearch = new FormControl();
  @Input({ alias: 'modal' })
  isModal: boolean = false;
  private readonly _debounce$: Subject<string> = new Subject<string>();
  @Input() listener!: () => void;

  constructor(private readonly _route: Router,
              private readonly _store: Store<AppState>) {
    this._store.select(selectSearchQuery).subscribe(res => {
      this.inputSearch.setValue(res);
    })
  }

  get debounce$(): Subject<string> {
    return this._debounce$;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._store.dispatch(searchActions.setSearchQuery({ query: this.inputSearch.value }));
  }

  ngOnInit(): void {
    this.debounce$.pipe(tap(vl => this._store.dispatch(searchActions.setSearchQuery({ query: vl }))),
                        filter(res => !!res && res.length > 5),
                        debounceTime(3000))
        .subscribe(result => {
          this.searchArticles(result).then(this.listener).catch(console.error)
        });
  }

  private searchArticles(result: string) {
    return this._route.navigate(['/article', 'list'], { queryParams: { search: result } });
  }
}
