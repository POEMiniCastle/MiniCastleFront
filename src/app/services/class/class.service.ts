import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Class } from 'src/app/core/entities/class';

@Injectable({
  providedIn: 'root'
})

  export class ClassService {
    url: string = "http://10.125.52.59:8080/api/class";

    constructor(private httpClient: HttpClient) { }
    getClass(): Observable<Class[]> {
       
      return this.httpClient.get<Class[]>(this.url)
      .pipe (
        map((res: Class[]) =>  res)
      )
    }
}
