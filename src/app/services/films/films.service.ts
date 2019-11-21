import { AbstractFilmsService, Film, Result } from './abstract-films.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

export class FilmsService extends AbstractFilmsService{

  constructor(private http: HttpClient) {
    super();
  }

  getFilms(page: number, genresId: string): Observable<Result> {
    let result: Result;
    let query = `https://api.themoviedb.org/3/discover/movie?api_key=d8c7ed05b2dc33a9f278b9a94ec333e8&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genresId}`;

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