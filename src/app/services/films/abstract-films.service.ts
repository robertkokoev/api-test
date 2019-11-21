import { Observable } from 'rxjs';
import { ReceivedFilm } from './films.service';

export abstract class AbstractFilmsService {
  abstract getFilms(page: number, genresId: string): Observable<Result>
}

export class Result {
  constructor(
    public page: number, 
    public totalPages: number, 
    public films: Film[]
  ) {  }
}

export class Film {

  id: number;
  title: string;
  releaseDate: string;
  overview: string;
  posterPath: string;

  constructor(receivedFilm: ReceivedFilm) { 
    this.id = receivedFilm.id;
    this.title = receivedFilm.title;
    this.releaseDate = receivedFilm.release_date;
    this.overview = receivedFilm.overview;
    this.posterPath = receivedFilm.poster_path;
  }

}