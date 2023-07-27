import { Component } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {
  token: string = 'register';
  form: UntypedFormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      username: new UntypedFormControl('', Validators.required),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [Validators.required, Validators.minLength(7)]),
      confirmPassword: new UntypedFormControl('', Validators.required)
    }, { validators: this.confirmedValidator('password', 'confirmPassword') });
  }

  confirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: UntypedFormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
          return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
  
  get f() {
    return this.form.controls;
  }

  submitRegistration() {
    //TODO implement this function
    //Post a new user in the database (check if the user already exists?)
  }

  submitConnection() {
    //TODO implement this function
    //Check if the user exists in the database, if yes redirect to the game, if not show an error
  }
}
