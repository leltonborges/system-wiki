import {
  Injectable,
  OnInit
} from '@angular/core';
import {
  debounceTime,
  filter,
  Subject
} from 'rxjs';
import {
  Filter,
  filterDefault
} from '../interface/filter';
import { Router } from '@angular/router';

@Injectable({
              providedIn: 'root'
            })
export class SearchListenerService
  implements OnInit {
  private oldValue!: string;
  private readonly _debounce$: Subject<string> = new Subject<string>();
  private listeners: Array<(result: string) => void> = [];

  constructor(private readonly _route: Router) {}

  get debounce$(): Subject<string> {
    return this._debounce$;
  }

  ngOnInit(): void {
    this._debounce$.pipe(filter(res => this.oldValue != res && !!res && res.length > 5),
                         debounceTime(3000))
        .subscribe(result => {
          this.oldValue = result;
          this.searchArticles(result)
              .then(() => this.notifyListeners(result))
              .catch(console.error);
        });
  }

  addListener(listener: (result: string) => void): void {
    this.listeners.push(listener);
  }

  removeListener(listener: (result: string) => void): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  private notifyListeners(result: string): void {
    this.listeners.forEach(listener => listener(result));
  }

  private searchArticles(result: string) {
    const filter: Filter = {
      ...filterDefault,
      search: result
    }
    return this._route.navigate(['/article', 'list'], { queryParams: filter });
  }
}
