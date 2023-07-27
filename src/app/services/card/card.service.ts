import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { Card } from 'src/app/core/entities/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  url:string = "http://10.125.52.59:8080/api/card";
  constructor(private httpClient: HttpClient) {}
    getCard(): Observable<Card[]> {

      return this.httpClient.get<Card[]>(this.url)
      .pipe (
        map((res : Card[]) => (res))
      ) 
    }
   

  
}
