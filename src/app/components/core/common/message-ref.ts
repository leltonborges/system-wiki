import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import {
  FieldError,
  FieldErrors
} from '../../../common/interface/error-response';

@Injectable({
              providedIn: 'root'
            })
export class MessageRef {

  constructor(private readonly _snackBar: MatSnackBar) {}

  error(msg: string,
        duration: number = 5000,
        horizontalPosition: MatSnackBarHorizontalPosition = 'end',
        verticalPosition: MatSnackBarVerticalPosition = 'top') {
    this._snackBar.open(msg,
                        'Close',
                        {
                          duration,
                          horizontalPosition,
                          verticalPosition
                        });
  }

  errorFields(fields: FieldErrors,
              duration: number = 5000,
              horizontalPosition: MatSnackBarHorizontalPosition = 'end',
              verticalPosition: MatSnackBarVerticalPosition = 'top') {
    fields.forEach((field: FieldError,
                    index: number) => {
      setTimeout(() => {
        this._snackBar.open(`${ field.field }: ${ field.message }`, 'Close', {
          duration,
          horizontalPosition,
          verticalPosition
        });
      }, duration * index);
    });
  }

  success(msg: string,
          duration: number = 5000,
          horizontalPosition: MatSnackBarHorizontalPosition = 'end',
          verticalPosition: MatSnackBarVerticalPosition = 'top') {
    this._snackBar.open(msg,
                        'Close',
                        {
                          duration,
                          horizontalPosition,
                          verticalPosition
                        });
  }
}
