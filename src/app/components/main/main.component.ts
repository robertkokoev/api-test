import { Component, OnInit } from '@angular/core';
import { AbstractFilmsService, Film } from 'src/app/services/films/abstract-films.service';
import { AbstractDetailsService, Details } from 'src/app/services/details/abstract-details.service';
import { GenreAdapter, GenresService } from 'src/app/services/genres/genres.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  details:        Details;
  detailsGenres:  string[] = [];
  countries:      string[] = [];
  query:          string;
  films:          Film[];
  totalPages:     number;
  page:           number;
  pagesArr:       number [] = [];
  arr:            number[] = [];
  new:            number[] = []; 
  genres:         GenreAdapter[];

  constructor(
    private filmsService: AbstractFilmsService, 
    private detailsService: AbstractDetailsService,
    private genresService: GenresService
    ) { }

  ngOnInit() {
    this.genresService.getGenres().subscribe(data => {
      this.genres = data;
    });
  }

  onSearchClick(page: number) {
    let genresId: string = this.genres
                .filter(g => g.checked)
                .map(g => g.id)
                .join(',');
    
    this.filmsService.getFilms(page, genresId).subscribe(data => {
      this.page = data.page;
      this.totalPages = data.totalPages;
      this.films = data.films;
    })
  }

  showDetails(id: number) {
    this.detailsService.getDetails(id).subscribe(data => {
      this.details = data;
      this.detailsGenres = data.genres
      this.countries = data.productionCountries;
    })
  }

  current: number;

  fill(number: number) {
    this.current = this.page;

    for (let i = 0; i < number; i++) {
      this.arr.push(i);  
    }

    if ((this.totalPages > 3) && (this.current > 2) && (this.current <= this.totalPages - 3)) {
      this.new = this.arr.slice(this.current - 3, this.current + 2);
    } else if ((this.totalPages < 3) && (this.current < 2)) {
      this.new = this.arr.slice(0, this.totalPages);
    } else if ((this.totalPages > 5) && (this.current < 4)) {
      this.new = this.arr.slice(0, 5);
    } else if ((this.totalPages > 3) && (this.current >= this.totalPages - 4)) {
      this.new = this.arr.slice(this.totalPages - 4, this.totalPages);
    }
    return this.new; 
  }

}
