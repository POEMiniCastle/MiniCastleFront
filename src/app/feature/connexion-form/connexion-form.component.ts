import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnexionPlayer } from 'src/app/core/entities/ConnexionPlayer';
import { Player } from 'src/app/core/entities/Player';
import { PlayerService } from 'src/app/services/player/player.service';

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
      next: (response: Player) => {
        sessionStorage.setItem("player", JSON.stringify(response));
        this.router.navigate(['/play-menu']);
      },
      error: (err) => console.error(err)
    });
  }
}
