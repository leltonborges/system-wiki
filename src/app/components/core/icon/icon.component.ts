import {
  Component,
  Input
} from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  AnimationProp,
  FaIconLibrary,
  FontAwesomeModule,
  RotateProp,
  SizeProp
} from '@fortawesome/angular-fontawesome';
import { MatTooltip } from '@angular/material/tooltip';


@Component({
             selector: 'sc-icon',
             standalone: true,
             imports: [FontAwesomeModule, MatTooltip],
             templateUrl: './icon.component.html',
             styleUrl: './icon.component.sass'
           })
export class IconComponent {
  @Input({ alias: 'icon', required: true })
  icon!: IconProp;
  @Input({ alias: 'animation' })
  animationType: AnimationProp | undefined;
  @Input({ alias: 'size' })
  size: SizeProp | undefined;
  @Input({ alias: 'border' })
  border: boolean | undefined;
  @Input({ alias: 'mask' })
  mask: IconProp | undefined;
  @Input({ alias: 'rotate' })
  rotate: RotateProp | undefined;
  @Input({ alias: 'title' })
  title: string | undefined;
  @Input({ alias: 'tooltip' })
  toolTip: string | undefined;

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
}
