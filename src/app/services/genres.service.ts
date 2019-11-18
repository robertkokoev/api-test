import { AbstractGenresService, Film } from './abstract-genres.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

export class GenresService extends AbstractGenresService{

  constructor(private http: HttpClient) {
    super();
  }

  getFilms(query: string): Observable<any> {
    // let films: Film[];
    // return this.http
    //   .get<Film[]>(query)
    //   .pipe(map(data => {
    //     return data.forEach<Film[]>(data => {
    //       data.title = film.title;
    //       data.overview = film.overview;
    //       data.poster_path = film.poster_path;
    //       data.realease_date = film.realease_date;
    //       return film;
    //     })
    //   }));

    return this.http.get(query);
  }
}