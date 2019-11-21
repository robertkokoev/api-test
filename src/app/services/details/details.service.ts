import { AbstractDetailsService, Details } from './abstract-details.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

export class DetailsService extends AbstractDetailsService {

  constructor(private http: HttpClient) {
    super();
  }

  getDetails(id: number): Observable<Details> {
    let details: Details;

    return this.http
      .get<any>(`https://api.themoviedb.org/3/movie/${id}?api_key=d8c7ed05b2dc33a9f278b9a94ec333e8`)
      .pipe(map(data => {
        return details = new Details(data.budget, data.genres, data.overview, data.poster_path, data.production_countries, data.release_date, data.runtime, data.title)
      }));
  }
}