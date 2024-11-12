import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withFetch
} from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import {
  providerDatePT,
  providerLocalePT,
  providerPaginatorPT
} from './material-locale-pt';
import { provideStore } from '@ngrx/store';
import { reducers } from './common/reducer';
import { provideEffects } from '@ngrx/effects';
import { articleEffects } from './common/reducer/article/article.effects';
import { filterEffects } from './common/reducer/filter/filter.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
              provideRouter(routes),
              provideAnimationsAsync(),
              provideHttpClient(withFetch()),
              importProvidersFrom(MatNativeDateModule),
              providerPaginatorPT,
              providerLocalePT,
              providerDatePT,
              provideStore(reducers),
              provideEffects(articleEffects, filterEffects)]
};
