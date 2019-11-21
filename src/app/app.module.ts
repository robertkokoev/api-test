import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { AbstractFilmsService } from './services/abstract-films.service';
import { FilmsService } from './services/films.service';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { FillPipe } from './pipes/fill.pipe';
import { FormsModule } from '@angular/forms';
import { DetailsService } from './services/details.service';
import { AbstractDetailsService } from './services/abstract-details.service';
import { GenresService } from './services/genres.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    EllipsisPipe,
    FillPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: AbstractFilmsService, useClass: FilmsService },
    { provide: AbstractDetailsService, useClass: DetailsService },
    GenresService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
