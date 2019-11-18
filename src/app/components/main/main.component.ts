import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractGenresService, Film } from 'src/app/services/abstract-genres.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  films: any;

  constructor(private http: AbstractGenresService) { }

  onSearchClick(query: string) {
    query = 'https://api.themoviedb.org/3/discover/movie?api_key=d8c7ed05b2dc33a9f278b9a94ec333e8&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_genres=18'
    this.http.getFilms(query).subscribe(data => {
      this.films = data.results;
    })
  }

  ngOnInit() {
  }

}
