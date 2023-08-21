import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnexionPlayer } from 'src/app/core/entities/ConnexionPlayer';
import { PlayerService } from 'src/app/services/player/player.service';
import jwt_decode from "jwt-decode";
import { JwtToken } from 'src/app/core/entities/JwtToken';
import { Jwt } from 'src/app/core/entities/Jwt';

@Component({
  selector: 'app-connexion-form',
  templateUrl: './connexion-form.component.html',
  styleUrls: ['./connexion-form.component.scss']
})
export class ConnexionFormComponent {
  form: UntypedFormGroup;
  constructor(formBuilder: FormBuilder, private httpClient: HttpClient, private playerService: PlayerService, private router:Router) {
    this.form = formBuilder.group({
      username: new UntypedFormControl('', Validators.required),
      password: new UntypedFormControl('', Validators.required),
    },);
  }
  
  get f() {
    return this.form.controls;
  }

  submitConnection(): void {
    this.playerService.connexion(new ConnexionPlayer(this.form.value.username, this.form.value.password))
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
