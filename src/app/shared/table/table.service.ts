import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Class } from 'src/app/core/entities/class';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private json: string = 'assets/json.json';

  constructor(private http: HttpClient) { }

  getClasses(): Observable<Class[]> {
    return this.http.get<any>(this.json).pipe(
      map(response => response.Classes)
    );
  }
}