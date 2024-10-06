import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

export const imageUrlValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if(value) {
      const patternURL: RegExp = /http(s)?:\/\/\w+\.\w+(\.\w+)?(\.\w+)?\/.*$/
      return patternURL.test(value) ? null : { invalidImageUrl: true };
    }

    return null;
  }
}
