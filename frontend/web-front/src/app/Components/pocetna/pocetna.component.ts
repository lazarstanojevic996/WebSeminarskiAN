import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Korisnik } from "../../Class/Korisnik";
import { Zadatak } from "../../Class/Zadatak";
import { KorisnikServiceService } from "../../Service/korisnik-service.service";
import { Router } from '@angular/router';
import { ZadatakService } from "../../Service/zadatak.service";
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';



@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  selektovan: number = -1;
  idKorisnika: any = null;
  zadaci: Zadatak[] = [];
  korisnik: Korisnik = new Korisnik();
  danas: any;
  doba:String ="";
  
  today:Date;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private korisnikService: KorisnikServiceService,
    private toastr: ToastrService,
    private zadatakService: ZadatakService
  ) { }

  ngOnInit() {
    if(this.korisnikService.ulogovan())
      this.idKorisnika = this.cookieService.get('cookie');
    else
      this.router.navigate(['']);
    
    this.dajKorisnika();
    this.dajZadatke();
   
    
    this.today= new Date();
    
    if(this.today.getHours() >= 6 && this.today.getHours() < 12)
      this.doba="Dobro jutro, ";
    else if(this.today.getHours() >= 12 && this.today.getHours() < 20)
      this.doba="Dobar dan, ";
    else
      this.doba="Dobro vece, "
    //console.log(this.today.getHours());
    
    


  }

  dajKorisnika() {
    this.korisnikService.vratiKorisnika(this.idKorisnika).subscribe((resp: any) => {
      if (resp.success == true) {
        this.korisnik = resp.korisnik;
        //console.log(this.korisnik);
      }
    })
  }

  dajZadatke() {
    this.zadatakService.dajZadatkeKorisnika(this.idKorisnika).subscribe((resp: any) => {
      //console.log(resp);
      if (resp.success == true) {
        this.zadaci = resp.zadaci;
        // console.log(this.zadaci);
      }
    })
  }

  OdjaviSe()
  {
    this.korisnikService.izloguj();
    this.router.navigate(['']);
  }


  //---------------------------

  ZatvoriTask(id:number)
  {
    this.zadatakService.zatvaranjeTaska(id).subscribe((resp: any) => {
      //console.log(resp);
      if (resp.success == true) {
        const toast = swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });

        toast({
          type: 'success',
          title: 'Uspesno ste zatvorili task!',
          onClose: () => this.router.navigate([''])
        })
        
      }
      else
      {
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

  IzmeniTask(id:number)
  {
    this.router.navigate(['izmeni/'+id]);
  }

  DodajTask()
  {
    this.router.navigate(['/dodaj']);
  }

  //---------------------------


  Otvori(id: number) {
    if (this.selektovan != id)
      this.selektovan = id;
    else
      this.selektovan = -1;
  }

  Zatvori() {
    this.selektovan = -1;
  }


}
