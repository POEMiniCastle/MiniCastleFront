import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { navBarData } from 'src/app/layout/navbar/navBarData';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  constructor(private httpClient: HttpClient) { }

  getNavBarContent(url: string): Observable<navBarData[]>{
    return this.httpClient.get<navBarData[]>(url)
    .pipe (
      map((res: navBarData[])=> (res))
    )
  }
}
