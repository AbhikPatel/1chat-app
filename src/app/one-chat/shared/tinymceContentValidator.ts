import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from 'src/app/core/models/login.model';

export function tinymceContentValidator(): (control: AbstractControl) => Observable<ValidationErrors | null> {

  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const content = control.value;
    // Login
console.log(content)

    // Simulate an asynchronous validation process
    return of(content === '<p>Valid Content</p>').pipe(
      map(isValid => (isValid ? null : { invalidContent: true }))
      
    );
  };
}