import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Card } from 'src/app/core/entities/card';
import { Monster } from 'src/app/core/entities/monster';

@Injectable({
  providedIn: 'root'
})

export class CardService {

  urlCard:string = "http://10.125.52.59:8080/api/card";

  urlMonster:string = "http://10.125.52.59:8080/api/card"
  
  constructor(private httpClient: HttpClient) {}

  getCard(): Observable<Card[]> {
    return this.httpClient.get<Card[]>(this.urlCard)
      .pipe (
        map((res : Card[]) => (res))
      ) 
  }

  getContentType(): Observable<Monster[]> {
    return this.httpClient.get<Monster[]>(this.urlMonster)
    .pipe (
      map((res : Monster[]) => (res))
    ) 
  }

}
