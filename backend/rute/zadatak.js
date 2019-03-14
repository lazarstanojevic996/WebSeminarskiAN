var express = require('express');
var router = express.Router();
var cors = require('cors');
router.use(cors());

var bodyParser = require('body-parser');
var Korisnik = require('../klase/Korisnik');
var baza = require('../config/database');
var Zadatak = require('../klase/Zadatak');


//var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database('baza.db');

router.use(bodyParser.json());






router.post('/dajZadatkeKorisnika', function (req, res, next) {
        baza.db.serialize(() => {

                [podaci] = [req.body.id];
                //console.log(podaci);
                let sql = "SELECT * FROM Zadaci where id_korisnika=?";
                
                baza.db.all(sql, podaci, (err, row) => {
                        if (err) {
                                res.status(404).send({ success: false });
                                return console.log(err.message);
                        }

                        res.status(200).send({ success: true, "zadaci" : row });
               
                });
        });

})

router.post('/zatvaranjeTaska', function (req, res, next) {
        baza.db.serialize(() => {

                [podaci] = [req.body.id];
                //console.log(podaci);
                let sql = "delete FROM Zadaci where id_zadatka=?";
                
                baza.db.all(sql, podaci, (err, row) => {
                        if (err) {
                                res.status(404).send({ success: false });
                                return console.log(err.message);
                        }

                        res.status(200).send({ success: true});
               
                });
        });

})

router.post('/sacuvajTask', function (req, res, next) {
        //console.log(req.body.zadatak.naslov);
        baza.db.serialize(() => {
                let z = new Zadatak();
                z.NapraviBezIDa(req.body.zadatak.id_korisnika,req.body.zadatak.naslov,req.body.zadatak.tekst,req.body.zadatak.datum)
                
                let podaci = [z.id_korisnika,z.naslov,z.tekst,z.datum];
               
                let sql = "insert into Zadaci(id_korisnika, naslov, tekst, datum) values(?,?,?,?)";
                
                baza.db.run(sql, podaci, (err) => {
                        if (err) {
                                res.status(404).send({ success: false });
                                return console.log(err.message);
                        }

                        res.status(200).send({ success: true });
                });;
        });

})


router.post('/izmeniZadatak', function (req, res, next) {
        baza.db.serialize(() => {

                let z = new Zadatak();
                z.NapraviSaIDom(req.body.zadatak.id_zadatka,req.body.zadatak.id_korisnika,req.body.zadatak.naslov,req.body.zadatak.tekst,req.body.zadatak.datum)
                console.log(z);
                let podaci = [z.id_korisnika,z.naslov,z.tekst,z.datum,z.id_zadatka];
                let sql = "Update Zadaci set id_korisnika=?, naslov=?, tekst=?, datum=? where id_zadatka = ?";

                console.log(podaci);
                console.log(sql);
                baza.db.all(sql, podaci, (err, row) => {
                        if (err) {
                                res.status(404).send({ success: false });
                                return console.log(err.message);
                        }

                        res.status(200).send({ success: true });
               
                });
        });

})

router.post('/dajZadatak', function (req, res, next) {
        baza.db.serialize(() => {

                podaci = [req.body.id];
                //console.log(podaci);
                let sql = "SELECT * FROM Zadaci where id_zadatka=?";
                
                baza.db.all(sql, podaci, (err, row) => {
                        if (err) {
                                res.status(404).send({ success: false });
                                return console.log(err.message);
                        }

                        res.status(200).send({ success: true, "zadatak" : row[0] });
               
                });
        });

})


module.exports = router;