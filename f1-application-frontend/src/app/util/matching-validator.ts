import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
    


export function MatchingValidator(controlName: string, matchingControlName: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        const control1 = formGroup.get(controlName);
        const control2 = formGroup.get(matchingControlName);
  
        if (!control1 || !control2) {
          return null;
        }
        if (control1.value !== control2.value) {
            control1.setErrors({ valueMismatch: true });
            control2.setErrors({ valueMismatch: true });
          return { valueMismatch: true };
        } else {
          return null;
        }
      };
  }