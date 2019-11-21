import { Component, OnInit } from '@angular/core';
import { AbstractFilmsService, Film } from 'src/app/services/abstract-films.service';
import { AbstractDetailsService, Details } from 'src/app/services/abstract-details.service';
import { GenreAdapter, GenresService } from 'src/app/services/genres.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  details: Details;
  detailsGenres: string[] = [];
  countres: string[] = [];
  query: string;
  films: Film[] = [];
  totalPages: number;
  page: number;
  pagesArr: number [] = [];
  arr: number[] = [];
  new: number[] = []; 
  genres: GenreAdapter[];

  constructor(
    private filmsService: AbstractFilmsService, 
    private detailsService: AbstractDetailsService,
    private genresService: GenresService
    ) { }

  ngOnInit() {
    this.genresService.getGenres().subscribe(data => {
      this.genres = data;
    })
  }

  onSearchClick(page: number) {
    let genresId: string = this.genres
                .filter(g => g.checked)
                .map(g => g.id)
                .join(',');
    
    this.query = `https://api.themoviedb.org/3/discover/movie?api_key=d8c7ed05b2dc33a9f278b9a94ec333e8&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genresId}`;

    this.filmsService.getFilms(this.query).subscribe(data => {
      this.page = data.page;
      this.totalPages = data.totalPages;
      this.films = data.films;
    })
  }

  onDetails(id: number) {
    this.detailsService.getDetails(id).subscribe(data => {
      this.details = data;
      this.detailsGenres = data.genres
      this.countres = data.productionCountries;
    })
  }

  fill(number: number) {
    let current = this.page;

    for (let i = 0; i < number; i++) {
      this.arr.push(i);  
    }

    if (current > 3) {
      this.new = this.arr.slice(current - 4, current + 3);
    } else {
      this.new = this.arr.slice(0, current + 5);
    }
    return this.new; 
  }

}
