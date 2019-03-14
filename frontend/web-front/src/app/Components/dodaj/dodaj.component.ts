import { Component, OnInit } from '@angular/core';
import { ZadatakService } from '../../Service/zadatak.service';
import { KorisnikServiceService } from '../../Service/korisnik-service.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Zadatak } from 'src/app/Class/Zadatak';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

@Component({
  selector: 'app-dodaj',
  templateUrl: './dodaj.component.html',
  styleUrls: ['./dodaj.component.css']
})
export class DodajComponent implements OnInit {

  idKorisnika: any;
  zadatak = new Zadatak();
  



  constructor
    (
      private router: Router,
      private korisnikService: KorisnikServiceService,
      private zadatakService: ZadatakService,
      private cookieService: CookieService,
      private toastr: ToastrService
    ) { }

  ngOnInit() {

    if (this.korisnikService.ulogovan)
      this.idKorisnika = this.cookieService.get('cookie');
    else
      this.router.navigate(['']);

    this.zadatak.naslov="";
    this.zadatak.tekst="";
    this.zadatak.datum="";


  }


  today = new Date();
  dd = this.today.getDate();
  mm = this.today.getMonth(); //January is 0!
  yyyy = this.today.getFullYear();
  minDate = new Date(this.yyyy, this.mm, this.dd);



  Sacuvaj() {
    this.zadatak.id_korisnika = this.idKorisnika;
    //console.log(this.zadatak);
    if (this.zadatak.naslov != "" && this.zadatak.tekst != "" && this.zadatak.datum != "") {
      this.zadatakService.sacuvajTask(this.zadatak).subscribe((resp: any) => {
        if (resp.success) {
          const toast = swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });

          toast({
            type: 'success',
            title: 'Uspesno ste izmenili podatke!',
            onClose: () => this.router.navigate(['/pocetna'])
          })
        }
        else {
          const toast = swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });

          toast({
            type: 'error',
            title: 'Podaci su nevalidni!'
          })
        }
      })
    }
    else {
      const toast = swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });

      toast({
        type: 'info',
        title: 'Niste uneli sve podatke!'
      })
    }

  }

  Pocetna() {
    this.router.navigate(['']);
  }
  OdjaviSe() {
    this.korisnikService.izloguj();
    this.router.navigate(['']);
  }


}
