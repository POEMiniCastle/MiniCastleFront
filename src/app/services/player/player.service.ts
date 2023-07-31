import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Player } from 'src/app/core/entities/Player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  urlRegistration:string = "http://localhost:8080/api/registration";

  constructor(private httpClient: HttpClient) { }

  register(player: Player): Observable<Player> {
    return this.httpClient.post<Player>(this.urlRegistration, player)
  }
}
