import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { AbstractFilmsService } from './services/films/abstract-films.service';
import { FilmsService } from './services/films/films.service';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { FormsModule } from '@angular/forms';
import { DetailsService } from './services/details/details.service';
import { AbstractDetailsService } from './services/details/abstract-details.service';
import { GenresService } from './services/genres/genres.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCommonModule } from '@angular/material/core';
import { DialogComponent } from './components/dialog/dialog.component';
import { Interceptor} from './services/interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    EllipsisPipe,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCommonModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: AbstractFilmsService, useClass: FilmsService },
    { provide: AbstractDetailsService, useClass: DetailsService },
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    GenresService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
