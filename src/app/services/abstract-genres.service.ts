import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractGenresService {

  abstract getFilms(query: string): Observable<any>
}