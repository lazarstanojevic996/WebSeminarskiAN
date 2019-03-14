import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './Components/start/start.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CookieService } from "ngx-cookie-service";

import {} from '@angular/material/'
import {MatDatepickerModule } from '@angular/material/datepicker'; 
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PocetnaComponent } from './Components/pocetna/pocetna.component';
import { DodajComponent } from './Components/dodaj/dodaj.component';
import {MatNativeDateModule} from '@angular/material';
import { IzmeniComponent } from './Components/izmeni/izmeni.component';
 

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    PocetnaComponent,
    DodajComponent,
    IzmeniComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ToastrModule.forRoot(),
    HttpModule,
    HttpClientModule,
    MatTooltipModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [CookieService,
    MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
