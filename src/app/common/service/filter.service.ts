import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable
} from 'rxjs';
import {
  Filter,
  filterDefault,
  filterValid
} from '../interface/filter';

@Injectable({
              providedIn: 'root'
            })
export class FilterService {
  private readonly filter$ = new BehaviorSubject<Filter>(filterDefault);

  constructor() { }

  push(filter: Filter): Filter {
    const valid: Filter = filterValid(filter);
    this.filter$.next(valid);
    return valid;
  }

  getFilterObservable(): Observable<Filter> {
    return this.filter$.asObservable();
  }
}
