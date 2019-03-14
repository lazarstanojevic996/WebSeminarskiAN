import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { Korisnik } from '../Class/Korisnik';

import { ToastrService} from 'ngx-toastr';
import {HttpClient,HttpHandler} from '@angular/common/http';
import { Zadatak } from '../Class/Zadatak';


@Injectable({
  providedIn: 'root'
})
export class ZadatakService {


  private adresa = "http://localhost:3000/";


  constructor
  (
    private router:Router,
    private toastr:ToastrService,
    private http:HttpClient
  ) 
  { 

  }

  dajZadatkeKorisnika(idKorisnika:number)
  {
    return this.http.post(this.adresa+"zadatak/dajZadatkeKorisnika",{id:idKorisnika});
  }

  zatvaranjeTaska(id:number)
  {
    return this.http.post(this.adresa+"zadatak/zatvaranjeTaska",{id:id});
  }

  sacuvajTask(zadatak:Zadatak)
  {

    return this.http.post(this.adresa+"zadatak/sacuvajTask",{"zadatak": zadatak});
  }

  dajZadatak(id:number)
  {
    return this.http.post(this.adresa+"zadatak/dajZadatak",{id:id});
  }

  izmeniZadatak(zadatak:Zadatak)
  {
    return this.http.post(this.adresa+"zadatak/izmeniZadatak",{"zadatak":zadatak});
  }


}
