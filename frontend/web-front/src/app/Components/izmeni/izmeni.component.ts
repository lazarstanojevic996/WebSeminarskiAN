import { Component, OnInit } from '@angular/core';
import { Zadatak } from 'src/app/Class/Zadatak';
import { ZadatakService } from '../../Service/zadatak.service';
import { Router } from '@angular/router';
import { KorisnikServiceService } from '../../Service/korisnik-service.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

@Component({
  selector: 'app-izmeni',
  templateUrl: './izmeni.component.html',
  styleUrls: ['./izmeni.component.css']
})
export class IzmeniComponent implements OnInit {

  constructor
  (
    private router: Router,
    private korisnikService: KorisnikServiceService,
    private zadatakService : ZadatakService,
    private toastr: ToastrService
  ) 
  {

   }

  id;
  zadatak = new Zadatak();

  today = new Date();
  dd = this.today.getDate();
  mm = this.today.getMonth(); //January is 0!
  yyyy = this.today.getFullYear(); 
  minDate = new Date(this.yyyy,this.mm, this.dd);
  


  ngOnInit() {
    if(this.korisnikService.ulogovan()==false)
      this.router.navigate(['']);

    this.id = window.location.pathname.split('/')[2];
    //console.log(this.id);

    this.zadatakService.dajZadatak(this.id).subscribe((resp:any)=>
    {
      if(resp.success)
        this.zadatak = resp.zadatak;
      
       //console.log(this.zadatak);

    })

    
  }

  Izmeni()
  {
    this.zadatakService.izmeniZadatak(this.zadatak).subscribe((resp:any) =>
    {
      if(resp.success)
      {
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

  Pocetna()
  {
    this.router.navigate(['']);
  }
  OdjaviSe()
  {
    this.korisnikService.izloguj();
    this.router.navigate(['']);
  }

}
