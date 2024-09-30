import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

export const imageUrlValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if(value) {
      const patternEnd: RegExp = /\.(jpg|jpeg|png|gif)$/i
      const patternURL: RegExp = /((http(s)?:\/\/)?([\p{L}\p{N}]{2,}\.[\p{L}\p{N}]{2,}\.[\p{L}\p{N}]{2,})(\/[\p{L}\p{N}]+)?)/u;
      return patternEnd.test(value) && patternURL.test(value) ? null : { invalidImageUrl: true };
    }

    return null;
  }
}
