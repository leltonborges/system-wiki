import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { TagService } from '../../../common/service/tag.service';

export const tagsResolver: ResolveFn<Observable<string[]>> = (route: ActivatedRouteSnapshot,
                                                              state: RouterStateSnapshot) => {
  return inject(TagService).findAllTags()
};
