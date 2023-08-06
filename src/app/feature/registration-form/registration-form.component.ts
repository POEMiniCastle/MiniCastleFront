import { Component } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RegistrationPlayer } from 'src/app/core/entities/RegistrationPlayer';
import { Player } from 'src/app/core/entities/Player';
import { PlayerService } from 'src/app/services/player/player.service';
import { Router } from '@angular/router';


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
      next: (response: Player) => {
        localStorage.setItem("player", JSON.stringify(response));
        this.router.navigate(['/play-menu']);
      },
      error: (err) => console.error(err)
    });
  }
}
