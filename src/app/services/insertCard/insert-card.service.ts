import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { monsterCreation } from 'src/app/core/entities/monsterCreation';
import { trapCreation } from 'src/app/core/entities/trapCreation';

@Injectable({
  providedIn: 'root'
})
export class InsertCardService {
  urlInsert: string = "http://localhost:8080/api/insertCard";

  constructor(private httpClient: HttpClient) { }

  insertMonster(card: monsterCreation): Observable<monsterCreation>{
    return this.httpClient.post<monsterCreation>(this.urlInsert, card);
  } 

  insertTrap(card: trapCreation): Observable<trapCreation>{
    return this.httpClient.post<trapCreation>(this.urlInsert, card);
  } 
}
