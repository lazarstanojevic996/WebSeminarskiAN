class Zadatak{

        constructor()
        {
                this.id_zadatka = '';
                this.id_korisnika = '';
                this.naslov = '';
                this.tekst = '';
                this.datum = '';
               
        }

        NapraviBezIDa(id_korisnika, naslov, tekst, datum)
        {
                this.id_korisnika = id_korisnika;
                this.naslov = naslov;
                this.tekst = tekst;
                this.datum = datum;
        }

        NapraviSaIDom(id_zadatka,id_korisnika, naslov, tekst, datum)
        {
                this.id_zadatka = id_zadatka;
                this.id_korisnika = id_korisnika;
                this.naslov = naslov;
                this.tekst = tekst;
                this.datum = datum;
                
        }

        toString()
        {
                return `${this.id_zadatka} | ${this.id_korisnika} |${this.naslov} |${this.tekst} | ${this.datum} `;
        }

        Print()
        {
                console.log(toString());
        }

}


module.exports = Zadatak;