import { Component } from '@angular/core';
import {
  RouterLink,
  RouterOutlet
} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
             selector: 'cs-main',
             standalone: true,
             imports: [RouterOutlet,
                       MatButtonModule,
                       MatToolbarModule,
                       MatIconModule,
                       MatSidenavModule, RouterLink],
             templateUrl: './app.component.html',
             styleUrl: './app.component.sass'
           })
export class AppComponent {
}
