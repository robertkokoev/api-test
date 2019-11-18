import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export abstract class AbstractGenresService {
  abstract getFilms(query: string): Observable<any>
}

export interface Film {
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
}