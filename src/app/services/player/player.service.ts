import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Player } from 'src/app/core/entities/Player';
import { RegistrationPlayer } from 'src/app/core/entities/RegistrationPlayer';
import { ConnexionPlayer } from 'src/app/core/entities/ConnexionPlayer';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  urlRegistration:string = "http://localhost:8080/api/registration";
  urlConnexion:string = "http://localhost:8080/api/connexion";

  constructor(private httpClient: HttpClient) { }

  register(player: RegistrationPlayer): Observable<Player> {
    return this.httpClient.post<Player>(this.urlRegistration, player)
  }

  connexion(player: ConnexionPlayer): Observable<Player> {
      return this.httpClient.post<Player>(this.urlConnexion, player);
  }
}
