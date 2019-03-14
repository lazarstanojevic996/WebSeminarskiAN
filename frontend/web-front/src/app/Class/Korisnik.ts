export class Korisnik{

        public id:number;
        public ime:string;
        public prezime:string;
        public korisnicko_ime:string;
        public lozinka:string;
        public email:string;
        public lozinka_potvrda:string;

        public static FromJSON(objekat:any):Korisnik
        {  
                let korisnik=new Korisnik();
                korisnik.id = objekat.id;
                korisnik.ime=objekat.ime;
                korisnik.prezime=objekat.prezime;
                korisnik.korisnicko_ime=objekat.korisnicko_ime;
                korisnik.lozinka=objekat.lozinka;
                korisnik.email=objekat.email;
                korisnik.lozinka_potvrda=objekat.lozinka_potvrda;
                return korisnik;
        }


        public static FromJsonToArray(objekat:any):Korisnik[]
        {
                let n=objekat.length;
                let korisnici:Korisnik[]=[]; 

                for(let i=0;i<n;i++)
                {
                korisnici.push(this.FromJSON(objekat[i]));
                }

                return korisnici;
        }

}