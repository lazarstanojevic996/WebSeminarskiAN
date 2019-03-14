import { Component, OnInit, Input } from '@angular/core';
import { Korisnik } from "../../Class/Korisnik";
import { CookieService } from "ngx-cookie-service";
import { KorisnikServiceService } from "../../Service/korisnik-service.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { TooltipPosition } from '@angular/material/tooltip';




@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  selektovano: number = 1;

  losUsername = "";
  nePoklavapnjeLozinki = "";
  losEmail = "";

  korisnik = new Korisnik();

  @Input('matTooltipPosition')
  position: TooltipPosition = "right";

  constructor
    (
      private router: Router,
      private korisnikService: KorisnikServiceService,
      private toastr: ToastrService,
      private cookie: CookieService
    ) {


  }

  ngOnInit() {
    if (this.korisnikService.ulogovan())
      this.router.navigate(['/pocetna']);


    this.losUsername = "";
    this.losEmail = "";
    this.nePoklavapnjeLozinki = "";
  }

  // prijava

  usernameLogIn = "";
  passwordLogIn = "";

  Prijavi() {

    //console.log(this.usernameLogIn+"--"+this.passwordLogIn);
    if (this.usernameLogIn.length > 0 && this.passwordLogIn.length > 0) {
      //console.log("1");
      this.korisnikService.prijavi(this.usernameLogIn, this.passwordLogIn).subscribe((resp: any) => {
        //if(data.msg == "password is't correct")
        //console.log(data.id);
        if (resp.success) {

          let datum = new Date();
          datum.setDate(datum.getDate() + 7);
          this.cookie.set('cookie', resp.id, datum);

          const toast = swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });

          toast({
            type: 'success',
            title: 'Uspesno ste se ulogovali!',
            onClose: () => this.router.navigate(['/pocetna'])
          })


        }
        else {
          //console.log(resp.error);
          const toast = swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });

          toast({
            type: 'error',
            title: resp.error,
            onClose: () => this.router.navigate([''])
          })
        }

      })

    }


  }



  //kraj prijave
  // registracija

  // pu:number=10;

  Registruj() {

    //this.proveraUsername();
    let pl = this.proveraLozinki();
    let pe = this.proveraEmail();
    //console.log(this.korisnik.prezime+"--"+pl+"--"+pe);
    if (pl && pe && this.korisnik.ime != "" && this.korisnik.prezime != "") {
      this.korisnikService.proveraUsername(this.korisnik.korisnicko_ime).subscribe((resp: any) => {
        // console.log(data.uspelo);
        if (resp.uspelo == 1) {
          //console.log("prosao reg");
          this.losUsername = "";
          this.korisnikService.RegistrujKorisnika(this.korisnik).subscribe((resp: any) => {
            //console.log(data.success)
            if (resp.success == true) {
              //console.log('uspesna registracija');
              this.korisnik = new Korisnik();
              this.selektovano = 1;
              const toast = swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
              });

              toast({
                type: 'success',
                title: 'Uspesno ste se registrovali!',
                onClose: () => this.router.navigate(['/pocetna'])
              })

            }
            else {
              //console.log(resp.error);
              const toast = swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
              });
    
              toast({
                type: 'error',
                title: "Podaci su nevalidni",
                onClose: () => this.router.navigate([''])
              })
            }
          })


        }
        else {

          this.losUsername = "Korisnicko ime vec postoji.";

        }
      })

    }
    else {
      //console.log(resp.error);
      const toast = swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });

      toast({
        type: 'error',
        title: "Podaci su nevalidni!",
        onClose: () => this.router.navigate([''])
      })
    }
  }



  proveraUsername() {

    //console.log(this.korisnik.korisnicko_ime+'---');

    this.korisnikService.proveraUsername(this.korisnik.korisnicko_ime).subscribe((data: any) => {
      // console.log(data.uspelo);
      if (data.uspelo == 1) {
        //console.log('da');
        this.losUsername = "";
        //this.pu=1;
      }
      else {
        //console.log('ne');
        this.losUsername = "Korisnicko ime vec postoji.";
        //this.pu=0;
      }
    })

  }

  proveraLozinki(): boolean {
    //console.log(this.korisnik.lozinka+" -- "+this.korisnik.lozinka_potvrda);

    if (this.korisnik.lozinka == this.korisnik.lozinka_potvrda) {
      this.nePoklavapnjeLozinki = "";
      return true;
    }
    this.nePoklavapnjeLozinki = "Lozinke se ne poklapaju.";
    return false;
  }

  proveraEmail(): boolean {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(this.korisnik.email)) {
      this.losEmail = "";
      return true;
    }

    this.losEmail = "Email adresa nije validna";
    return false;
  }

  // kraj registracije


  DugmePrijava() {
    this.selektovano = 1;
  }

  DugmeRegistracija() {
    this.selektovano = 2;
  }


}
