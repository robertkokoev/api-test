import { AbstractDetailsService, Details } from './abstract-details.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

export class DetailsService extends AbstractDetailsService {

  api = environment.detailsApiUrl;

  constructor(private http: HttpClient) {
    super();
  }

  getDetails(id: number): Observable<Details> {
    return this.http
      .get<any>(this.api + id.toString())
      .pipe(map(data => {
        const genres: string[] = data.genres.map(g => g.name);
        const countries: string[] = data.production_countries.map(c => c.name);
        return new Details(data.budget, genres, data.overview, data.poster_path, countries, data.release_date, data.runtime, data.title, data.vote_average);
      }));
  }
}
