export class Zadatak{

        public id_zadatka:number;
        public id_korisnika:string;
        public naslov:string;
        public tekst:string;
        public lozinka:string;
        public datum:string;
        

        public static FromJSON(objekat:any):Zadatak
        {  
                let zadaci=new Zadatak();
                zadaci.id_zadatka = objekat.id_zadatka;
                zadaci.id_korisnika=objekat.id_korisnika;
                zadaci.naslov=objekat.naslov;
                zadaci.tekst=objekat.tekst;
                zadaci.lozinka=objekat.lozinka;
                zadaci.datum=objekat.datum;
               
                return zadaci;
        }


        public static FromJsonToArray(objekat:any):Zadatak[]
        {
                let n=objekat.length;
                let zadaci:Zadatak[]=[]; 

                for(let i=0;i<n;i++)
                {
                        zadaci.push(this.FromJSON(objekat[i]));
                }

                return zadaci;
        }

}