import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Player } from 'src/app/core/entities/Player';
import { RegistrationPlayer } from 'src/app/core/entities/RegistrationPlayer';
import { ConnexionPlayer } from 'src/app/core/entities/ConnexionPlayer';
import { JwtToken } from 'src/app/core/entities/JwtToken';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  urlRegistration:string = "http://localhost:8080/registration";
  urlConnexion:string = "http://localhost:8080/connexion";

  constructor(private httpClient: HttpClient) { }

  register(player: RegistrationPlayer): Observable<JwtToken> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<JwtToken>(this.urlRegistration, JSON.stringify(player), {headers});
  }

  connexion(player: ConnexionPlayer): Observable<JwtToken> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.httpClient.post<JwtToken>(this.urlConnexion, JSON.stringify(player), {headers});
  }
}
