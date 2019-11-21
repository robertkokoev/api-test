import { AbstractFilmsService, Film, Result } from './abstract-films.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

export class FilmsService extends AbstractFilmsService{

  constructor(private http: HttpClient) {
    super();
  }

  getFilms(query: string): Observable<Result> {
    let result: Result;
    return this.http
      .get<any>(query)
      .pipe(map(data => {
        const films = data.results.map(f => new Film(f));
        return result = new Result(data.page, data.total_pages, films);
      }));
  }
}

export interface ReceivedFilm {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string;
}