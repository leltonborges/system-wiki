import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';

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
