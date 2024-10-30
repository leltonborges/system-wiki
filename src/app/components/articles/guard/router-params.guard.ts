import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { inject } from '@angular/core';
import {
  Filter,
  filterValid,
  invalidFilter
} from '../../../common/interface/filter';
import { Store } from '@ngrx/store';
import { AppState } from '../../../common/reducer';
import { filterActions } from '../../../common/reducer/filter/filter.actions';

export const routerParamsGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
                                                 state: RouterStateSnapshot) => {
  const router = inject(Router);
  const store$ = inject(Store<AppState>);

  const filterParams: Filter = route.queryParams as Filter;
  if(invalidFilter(filterParams)) {
    const filter = filterValid(filterParams);
    router.navigate(['/article', 'list'], { queryParams: filter })
          .then(_ => store$.dispatch(filterActions.setFilterAction({ filter })))
          .catch(console.error);

    return false;
  }
  store$.dispatch(filterActions.setFilterAction({ filter: filterParams }))

  return true;
};
