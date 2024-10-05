import {
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy
} from '@angular/core';
import {
  RouterLink,
  RouterOutlet
} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MediaMatcher } from '@angular/cdk/layout';
import { IconComponent } from '@c/core/icon/icon.component';
import { TopicNavigationComponent } from '@c/navegation/topic-navegation/topic-navigation.component';

@Component({
             selector: 'cs-main',
             standalone: true,
             imports: [RouterOutlet,
                       MatButtonModule,
                       MatToolbarModule,
                       MatIconModule,
                       MatSidenavModule, RouterLink, IconComponent, TopicNavigationComponent],
             templateUrl: './app.component.html',
             styleUrl: './app.component.sass'
           })
export class AppComponent
  implements OnDestroy {
  mobileQuery!: MediaQueryList;

  constructor() {
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);

    // this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQuery = media.matchMedia('(max-width: 1130px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  private readonly _mobileQueryListener!: () => void;

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

}
