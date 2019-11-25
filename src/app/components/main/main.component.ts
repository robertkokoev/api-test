import { Component, OnInit } from '@angular/core';
import { AbstractFilmsService, Film } from 'src/app/services/films/abstract-films.service';
import { AbstractDetailsService, Details } from 'src/app/services/details/abstract-details.service';
import { GenreAdapter, GenresService } from 'src/app/services/genres/genres.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';


@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  details: Details;
  films: Film[] = [];
  genres: GenreAdapter[] = [];
  sorting: string = "popularity.desc";
  detailsGenres: string[] = [];
  countries: string[] = [];
  adult: boolean = false;
  current: number;
  totalPages: number;
  page: number;
  arr: number[] = [];
  new: number[] = [];

  constructor(
    private filmsService: AbstractFilmsService,
    private detailsService: AbstractDetailsService,
    private genresService: GenresService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.genresService.getGenres().subscribe(data => {
      this.genres = data;
    });

    this.onSearchClick(1);
  }

  openDialog(id: number): void {
    this.getDetails(id).subscribe(() => {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: "60%",
        data: {
          budget: this.details.budget,
          genres: this.detailsGenres,
          overview: this.details.overview,
          posterPath: this.details.posterPath,
          productionCountries: this.countries,
          releaseDate: this.details.releaseDate,
          runtime: this.details.runtime,
          title: this.details.title,
          voteAverage: this.details.voteAverage
        }
      });

      dialogRef.afterClosed().subscribe(() => {
        this.details = undefined;
        this.detailsGenres = undefined;
        this.countries = undefined;
      });
    });
  }

  getDetails(id: number): Observable<Details> {
    return new Observable(observer => {
      this.detailsService.getDetails(id).subscribe(data => {
        if (data) {
          this.details = data;
          this.detailsGenres = data.genres;
          this.countries = data.productionCountries;
        }
        observer.next();
      });
    });
  }

  onSearchClick(page: number): void {
    this.films = [];
    let genresId: string = this.genres
      .filter(g => g.checked)
      .map(g => g.id)
      .join(",");

    this.filmsService
      .getFilms(page, genresId, this.sorting, this.adult)
      .pipe(delay(500))
      .subscribe(data => {
        this.page = data.page;
        this.totalPages = data.totalPages;
        this.films = data.films;
      });
  }

  fill(number: number): number[] {
    this.current = this.page;
    this.new = [];
    this.arr = [];

    for (let i = 2; i < number; i++) {
      this.arr.push(i);
    }

    if (
      this.totalPages > 3 &&
      this.current > 3 &&
      this.current <= this.totalPages
    ) {
      this.new = this.arr.slice(this.current - 4, this.current + 1);
    } else if (this.totalPages < 3 && this.current < 3) {
      this.new = this.arr.slice(0, this.totalPages);
    } else if (this.totalPages > 5 && this.current < 4) {
      this.new = this.arr.slice(0, 5);
    } else if (this.totalPages > 3 && this.current >= this.totalPages - 4) {
      this.new = this.arr.slice(this.totalPages - 4, this.totalPages);
    }
    return this.new;
  }
}
