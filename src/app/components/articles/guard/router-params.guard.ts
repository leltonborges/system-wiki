import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { inject } from '@angular/core';
import {
  Filter,
  filterDefault
} from '../../../common/interface/Filter';

export const routerParamsGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
                                                 state: RouterStateSnapshot) => {
  const router = inject(Router);
  const activatedRoute = inject(ActivatedRoute);

  const { title, author, tag, startDate, endDate, page, pageSize } = route.queryParams;

  const missingParams = !endDate || !page || page < 1 || !pageSize || pageSize < 10;

  if(missingParams) {
    const filter: Filter = {
      ...filterDefault,
      title,
      tag,
      author,
      startDate
    };

    router.navigate([], {
      relativeTo: activatedRoute,
      queryParams: filter,
      queryParamsHandling: 'merge'
    }).catch(console.error);

    return false;
  }

  return true;
};
