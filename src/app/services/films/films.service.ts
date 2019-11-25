import { AbstractFilmsService, Film, Result } from './abstract-films.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export class FilmsService extends AbstractFilmsService {

  api = environment.filmsApiUrl;

  constructor(private http: HttpClient) {
    super();
  }

  getFilms(page: number, genresId: string, sorting: string, adult: boolean): Observable<Result> {
    return this.http
      .get<any>(this.api, {
        params: {
          sort_by: sorting,
          include_adult: adult.toString(),
          page: page.toString(),
          with_genres: genresId
        }
      })
      .pipe(map(data => {
        const films = data.results.map((f: ReceivedFilm) => new Film(f));
        return new Result(data.page, data.total_pages, films);
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
