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
import { FilterService } from '../../../common/service/filter.service';

export const routerParamsGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
                                                 state: RouterStateSnapshot) => {
  const router = inject(Router);
  const filterService = inject(FilterService);

  const filterParams: Filter = route.queryParams as Filter;
  if(invalidFilter(filterParams)) {
    router.navigate(['/article', 'list'], {
      queryParams: filterService.push(filterValid(filterParams))
    }).catch(console.error);

    return false;
  }

  filterService.push(filterParams)

  return true;
};
