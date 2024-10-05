import { Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';
import { DialogContent } from '../../../core/model/dialog-content';
import { ConfirmationDialogComponent } from '@c/core/confirmation-dialog/confirmation-dialog.component';

@Injectable({
              providedIn: 'root'
            })
export class DialogRef {

  constructor(private readonly _dialog: MatDialog) {}

  openDialog(content: DialogContent,
             enterDuration?: number,
             exitDuration?: number): MatDialogRef<ConfirmationDialogComponent> {
    return this._dialog.open(ConfirmationDialogComponent, {
      data: content,
      enterAnimationDuration: enterDuration ? enterDuration + 'ms' : '0ms',
      exitAnimationDuration: exitDuration ? exitDuration + 'ms' : '0ms'
    });
  }
}
