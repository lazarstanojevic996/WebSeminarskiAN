import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { Korisnik } from '../Class/Korisnik';

import { Observable } from 'rxjs'
import { ToastrService} from 'ngx-toastr';
import {HttpClient,HttpHandler} from '@angular/common/http';
import {environment} from '../../environments/environment'
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class KorisnikServiceService {

  private adresa = "http://localhost:3000/";

  constructor
  (
    private router:Router,
    private toastr:ToastrService,
    private http:HttpClient,
    private cookieService:CookieService
  ) 
  { 

  }

  ulogovan()
  {
    return this.cookieService.check('cookie');  
  }

  izloguj()
  {
    if(this.ulogovan())
      this.cookieService.delete('cookie');
  }

  



  prijavi(username:string, password:string)
  {
    return this.http.post(this.adresa+"korisnik/login", {username: username, password: password});
  }

  proveraUsername(username:string)
  {
    //console.log(username +" -- service");
    return this.http.post(this.adresa+"korisnik/proveraUsername", {username: username});
  }

  RegistrujKorisnika(user:Korisnik)
  {
    //console.log(JSON.stringify(user));
    return this.http.post(this.adresa+"korisnik/registracija",{"user" : user});
  }

  vratiKorisnika(id:number)
  {
    //console.log(id);
    return this.http.post(this.adresa+"korisnik/vratiKorisnika", {id: id});
  }

}
