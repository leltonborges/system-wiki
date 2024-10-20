import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy
} from '@angular/core';
import {
  Event,
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
import { MatTooltipModule } from '@angular/material/tooltip';

import { NgIf } from '@angular/common';
import { SearchComponent } from '@c/navegation/search/search.component';
import { MatDialog } from '@angular/material/dialog';
import { SearchModalComponent } from '@c/navegation/search-modal/search-modal.component';

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
                       SideNavigationComponent,
                       MatTooltipModule,
                       NgIf,
                       SearchComponent],
             templateUrl: './app.component.html',
             styleUrl: './app.component.sass'
           })
export class AppComponent
  implements OnDestroy {
  desktopQuery!: MediaQueryList;
  private readonly _queryListenerDesktop!: () => void;

  constructor(readonly _media: MediaMatcher,
              readonly _detectorRef: ChangeDetectorRef,
              private readonly _dialog: MatDialog) {
    this.desktopQuery = _media.matchMedia('(max-width: 1130px)');
    this._queryListenerDesktop = () => _detectorRef.detectChanges();
    this.desktopQuery.addEventListener('change', this._queryListenerDesktop)
    this.screenSize();
  }

  private _isMobile = false;

  get isMobile(): boolean {
    return this._isMobile;
  }

  ngOnDestroy(): void {
    this.desktopQuery.removeEventListener('change', this._queryListenerDesktop);
  }

  @HostListener('window:resize', ['$event'])
  screenSize(event?: Event) {
    this._isMobile = window.innerWidth <= 550
  }

  openModalSearch() {
    this._dialog.open(SearchModalComponent);
  }

  handleKeyDown($event: KeyboardEvent): void {
    console.log('Desabilitado!!');
  }
}
