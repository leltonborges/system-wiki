import {
  ChangeDetectorRef,
  Component,
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
import { SideNavigationComponent } from '@c/navegation/side-nav/side-navigation.component';

@Component({
             selector: 'cs-main',
             standalone: true,
             imports: [RouterOutlet,
                       MatButtonModule,
                       MatToolbarModule,
                       MatIconModule,
                       MatSidenavModule,
                       RouterLink,
                       IconComponent,
                       SideNavigationComponent],
             templateUrl: './app.component.html',
             styleUrl: './app.component.sass'
           })
export class AppComponent
  implements OnDestroy {
  mobileQuery!: MediaQueryList;

  constructor(private readonly _media: MediaMatcher,
              private readonly _detectorRef: ChangeDetectorRef) {

    // this.mobileQuery = _media.matchMedia('(max-width: 600px)');
    this.mobileQuery = _media.matchMedia('(max-width: 1130px)');
    this._mobileQueryListener = () => _detectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  private readonly _mobileQueryListener!: () => void;

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

}
