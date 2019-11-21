import { Observable } from 'rxjs';

export abstract class AbstractDetailsService {
  abstract getDetails(id: number): Observable<Details>;
}

export class Details {

  constructor(
    public budget: number,
    public genres: string[],
    public overview: string,
    public posterPath: string,
    public productionCountries: string[],
    public releaseDate: string,
    public runtime: number,
    public title: string) { }

}