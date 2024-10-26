import { Component } from '@angular/core';
import { IconSvgComponent } from '@c/core/components/icon-svg/icon-svg.component';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
             selector: 'cs-no-found',
             standalone: true,
             imports: [
               IconSvgComponent,
               MatIcon,
               MatFabButton,
               RouterLink
             ],
             templateUrl: './no-found.component.html',
             styleUrl: './no-found.component.sass'
           })
export class NoFoundComponent {

}
