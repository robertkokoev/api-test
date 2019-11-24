import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';

export class GenresService {

  constructor(private http: HttpClient) {

  }

  getGenres(): Observable<GenreAdapter[]> {
    return this.http
      .get<Genre[]>('../assets/test-data/genres.json')
      .pipe(map(data => {
        return data.map(d => {
          return Object.assign(d, { checked: false }) as GenreAdapter});
      }));
  }
}

export interface Genre {
  id: number;
  name: string;
}

export type GenreAdapter = Genre & { checked: boolean }