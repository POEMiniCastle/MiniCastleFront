import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from 'src/app/core/entities/card';
import { cardCreation } from 'src/app/core/entities/cardCreation';
import { Monster } from 'src/app/core/entities/monster';
import { MonsterCardComponent } from 'src/app/shared/card/monster-card/monster-card.component';

@Injectable({
  providedIn: 'root'
})
export class InsertCardService {
  urlInsert: string = "http://localhost:8080/api/insertCard";

  constructor(private httpClient: HttpClient) { }

  insert(card: cardCreation): Observable<cardCreation>{
    return this.httpClient.post<cardCreation>(this.urlInsert, card);
  } 
}
