import { AbstractGenresService, Film, Result } from './abstract-genres.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

export class GenresService extends AbstractGenresService{

  constructor(private http: HttpClient) {
    super();
  }

  getFilms(query: string): Observable<any> {
    let result: Result;
    return this.http
      .get<any>(query)
      .pipe(map(data => {
        return result = new Result(data.page, data.total_pages, data.results);
      }));

    // return this.http.get(query);
  }
}