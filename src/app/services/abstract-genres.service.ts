import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export abstract class AbstractGenresService {
  abstract getFilms(query: string): Observable<any>
}

export class Result {

  films: Film[] = [];

  constructor(public page: number, public totalPages: number, public data) {

    data.forEach(film => {
      if (film !== undefined) {
        this.films.push(new Film(film.id, film.title, film.overview, film.release_date, film.poster_path)); 
      }
    });
  }

}

export class Film {

  constructor(
    public id,
    public title: string, 
    public overview: string, 
    public releaseDate: string, 
    public posterPath: string) {

  }

}