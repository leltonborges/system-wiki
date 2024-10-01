import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule
} from '@angular/material/dialog';
import { DialogContent } from '../../../core/model/dialog-content';


@Component({
             selector: 'cs-confirmation-dialog',
             templateUrl: './confirmation-dialog.component.html',
             styleUrl: './confirmation-dialog.component.sass',
             standalone: true,
             imports: [MatDialogModule, MatButtonModule],
             changeDetection: ChangeDetectionStrategy.OnPush
           })
export class ConfirmationDialogComponent {
  readonly data = inject<DialogContent>(MAT_DIALOG_DATA);
}
