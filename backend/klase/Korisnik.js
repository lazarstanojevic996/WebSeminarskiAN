class Korisnik{

        constructor()
        {
                this.id = '';
                this.korisnicko_ime = '';
                this.lozinka = '';
                this.ime = '';
                this.prezime = '';
                this.email = '';
        }

        NapraviBezIDa(korisnicko_ime, lozinka, ime, prezime, email)
        {
                this.korisnicko_ime = korisnicko_ime;
                this.lozinka = lozinka;
                this.ime = ime;
                this.prezime = prezime;
                this.email = email;
        }

        NapraviSaIDom(id,korisnicko_ime, lozinka, ime, prezime, email)
        {
                this.id = id;
                this.korisnicko_ime = korisnicko_ime;
                this.lozinka = lozinka;
                this.ime = ime;
                this.prezime = prezime;
                this.email = email;
        }

        toString()
        {
                return `${this.id} | ${this.korisnicko_ime} |${this.lozinka} |${this.ime} | ${this.prezime} | ${this.email}`;
        }

        Print()
        {
                console.log(toString());
        }

}


module.exports = Korisnik;