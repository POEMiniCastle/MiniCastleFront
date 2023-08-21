import { Component } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RegistrationPlayer } from 'src/app/core/entities/RegistrationPlayer';
import { PlayerService } from 'src/app/services/player/player.service';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { JwtToken } from 'src/app/core/entities/JwtToken';
import { Jwt } from 'src/app/core/entities/Jwt';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {
  form: UntypedFormGroup;
  
  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private playerService: PlayerService, private router:Router) {
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
    this.playerService.register(new RegistrationPlayer(this.form.value.email, this.form.value.username, this.form.value.password))
    .subscribe({
      next: (response: JwtToken) => {
        let decoded: Jwt = jwt_decode(response.token);
        localStorage.setItem("player", JSON.stringify(decoded.player));
        localStorage.setItem("token", response.token);
        this.router.navigate(['/play-menu']);
      },
      error: (err) => console.error(err)
    });
  }
}
