import {
  Component,
  Input
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
             selector: 'cs-icon-svg',
             standalone: true,
             imports: [
               NgOptimizedImage
             ],
             templateUrl: './icon-svg.component.html',
             styleUrl: './icon-svg.component.sass'
           })
export class IconSvgComponent {
  @Input() rootPath: string = '/assets/svgs';
  @Input({ required: true }) svgName: string = '';
  @Input() classes: string = 'responsive-svg';
  @Input() svgTitle: string = '';
  @Input() height: string = '100';
  @Input() width: string = '100';
  styles: Record<string, string | number> = {
    'max-width': '100%',
    'height': 'auto',
    'display': 'block'
  };

  get svgPath(): string {
    return `${ this.rootPath }/${ this.svgName }.svg`;
  }
}

