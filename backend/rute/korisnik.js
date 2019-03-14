var express = require('express');
var router = express.Router();
var cors = require('cors');
router.use(cors());

var bodyParser = require('body-parser');
var Korisnik = require('../klase/Korisnik');
var baza = require('../config/database');



//var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database('baza.db');

router.use(bodyParser.json());

var bcrypt = require("bcrypt");




router.post('/login', function (req, res, next) {
        baza.db.serialize(() => {

                username = req.body.username;
                password = req.body.password;
                podaci = [username];
                // console.log(username + " -- "+password);
                let sql = "select * from Korisnik where korisnicko_ime = ?";
                //console.log(sql);
                baza.db.all(sql, [username], (err, row) => {
                        if (err)
                                console.log(err);
                        else {
                                if (row.length != 0) {
                                        let user = new Korisnik();
                                        user.NapraviSaIDom(row[0].id, row[0].korisnicko_ime, row[0].lozinka, row[0].ime, row[0].prezime, row[0].email);
                                        if(bcrypt.compareSync(password, user.lozinka)==true)
                                        {
                                                
                                                        res.send({ success: true, "id": user.id });
                                                
                                        }
                                }
                                else {
                                        res.send({ error: "Lose korisnicko ime ili lozinka" });
                                }
                        }
                });
        });

})

router.post('/proveraUsername', function (req, res, next) {
        baza.db.serialize(() => {



                username = req.body.username;
                //password = req.body.password;
                podaci = [username];
                //console.log(req.body.username + " -- ");
                let sql = "select * from Korisnik where korisnicko_ime = ?";
                //console.log(sql);
                baza.db.all(sql, [username], (err, row) => {
                        if (err)
                                console.log(err);
                        else {
                                if (row.length == 0) {
                                        res.send({ "msg": "success", "uspelo": 1 });
                                }
                                else {
                                        res.send({ "msg": "failure", "uspelo": 0 });
                                }
                        }
                });
        });

})

router.post('/registracija', function (req, res, next) {

        baza.db.serialize(() => {


                let k = new Korisnik();

               

                k.NapraviBezIDa(req.body.user.korisnicko_ime,req.body.user.lozinka,req.body.user.ime,req.body.user.prezime,req.body.user.email)
                //console.log(k);
                let sql = "INSERT INTO Korisnik(ime, prezime, korisnicko_ime, email, lozinka) VALUES(?,?,?,?,?)";
                let podaci = [k.ime, k.prezime, k.korisnicko_ime, k.email, bcrypt.hashSync(k.lozinka,10)];
                baza.db.run(sql, podaci, (err) => {
                        if (err) {
                                res.status(404).send({ success: false });
                                return console.log(err.message);
                        }

                        res.status(200).send({ success: true });
                });
        });

})


router.post('/vratiKorisnika', function (req, res, next) {

        baza.db.serialize(() => {

                [podaci] = [req.body.id];
                //console.log(podaci);
                let sql = "SELECT * FROM Korisnik where id=?";
                
                baza.db.all(sql, podaci, (err, row) => {
                        if (err) {
                                res.status(404).send({ success: false });
                                return console.log(err.message);
                        }

                        res.status(200).send({ success: true, "korisnik" : row[0] });
                });
        });

})



module.exports = router;