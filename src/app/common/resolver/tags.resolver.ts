import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { TagService } from '../service/tag.service';

export const tagsResolver: ResolveFn<Observable<string[]>> = (route: ActivatedRouteSnapshot,
                                                              state: RouterStateSnapshot) => {
  console.log('resolver aqui')
  return inject(TagService).findAllTags()
};
