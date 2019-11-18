import { AbstractGenresService } from './abstract-genres.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class GenresService implements AbstractGenresService{

  constructor(private http: HttpClient) {
    
  }

  getFilms(query: string): Observable<any> {
    return this.http.get(query);
  }

}