import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { Card } from 'src/app/core/entities/card';
import { Monster } from 'src/app/core/entities/monster';
import { Trap } from 'src/app/core/entities/trap';

@Injectable({
  providedIn: 'root'
})

export class CardService {

  urlCard:string = "http://localhost:8080/api/random";

  urlMonster:string = "http://localhost:8080/api/monstercard"

  urlTrap:string = "http://localhost:8080/api/trapcard"
  
  constructor(private httpClient: HttpClient) {}

  getCard(): Observable<Card[]> {
    if(sessionStorage.getItem("cards") !== null){
      return of(JSON.parse(sessionStorage.getItem("cards")as string))
    }else {
    return this.httpClient.get<Card[]>(this.urlCard)
      .pipe (
        tap((res : Card[]) => (res)),
        tap((res : Card[])=> sessionStorage.setItem("cards", JSON.stringify(res)))
      ) 
    }
  }

  getMonsterType(id:number): Observable<Monster> {
    return this.httpClient.get<Monster>(this.urlMonster + "/" + id)
    .pipe (
      map((res : Monster) => (res))
    ) 
  }

  getTrapType(id:number): Observable<Trap> {
    return this.httpClient.get<Trap>(this.urlTrap + "/" + id)
    .pipe (
      map((res : Trap) => (res))
    ) 
  }
}
