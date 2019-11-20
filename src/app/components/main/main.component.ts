import { Component, OnInit } from '@angular/core';
import { AbstractGenresService, Film } from 'src/app/services/abstract-genres.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  query: string;
  films: any;
  totalPages: number;
  page: number;
  pagesArr: number [] = [];
  arr: number[] = [];
  new: number[] = []; 

  genres = [
    {
      id: 28,
      name: 'Action',
      checked: false
    },
    {
      id: 12,
      name: 'Adventure',
      checked: false
    },
    {
      id: 16,
      name: 'Animaion',
      checked: false
    },
    {
      id: 35,
      name: 'Comedy',
      checked: false
    },
    {
      id: 12,
      name: 'Adventure',
      checked: false
    },
    {
      id: 80,
      name: 'Crime',
      checked: false
    },
    {
      id: 99,
      name: 'Documentary',
      checked: false
    },
    {
      id: 18,
      name: 'Drama',
      checked: false
    },
    {
      id: 10751,
      name: 'Family',
      checked: false
    },
    {
      id: 14,
      name: 'Fantasy',
      checked: false
    },
    {
      id: 36,
      name: 'History',
      checked: false
    },
    {
      id: 27,
      name: 'Horror',
      checked: false
    },
    {
      id: 10402,
      name: 'Music',
      checked: false
    },
    {
      id: 9648,
      name: 'Mistery',
      checked: false
    },
    {
      id: 10749,
      name: 'Romance',
      checked: false
    },
    {
      id: 878,
      name: 'Science Fiction',
      checked: false
    },
    {
      id: 10770,
      name: 'TV Movie',
      checked: false
    },
    {
      id: 53,
      name: 'Thriller',
      checked: false
    },
    {
      id: 10752,
      name: 'War',
      checked: false
    },
    {
      id: 37,
      name: 'Western',
      checked: false
    }
  ];

  constructor(private http: AbstractGenresService) { }

  ngOnInit() {
  }

  onSearchClick(page: number) {
    let genresId: string = this.genres
                .filter(g => g.checked)
                .map(g => g.id)
                .join(',');
    
    this.query = `https://api.themoviedb.org/3/discover/movie?api_key=d8c7ed05b2dc33a9f278b9a94ec333e8&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genresId}`;

    this.http.getFilms(this.query).subscribe(data => {
      this.page = data.page;
      this.totalPages = data.totalPages;
      this.films = data.films;
    })
  }

  onDetails(id: number) {
    
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

  onPageSelect(page: number) {

  }

}
