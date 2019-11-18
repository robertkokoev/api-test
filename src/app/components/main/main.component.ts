import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractGenresService } from 'src/app/services/abstract-genres.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  films: any;

  constructor(private http: AbstractGenresService) { }

  onSearchClick(query: string) {
    this.http.getFilms(query).subscribe(data => {
      this.films = data;
    })
  }

  ngOnInit() {
  }

}
