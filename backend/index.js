
var express = require('express');
var app = express();
var path = require('path');
//var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database('baza');

var dir = path.join(__dirname, 'public');
var cors = require('cors');
app.use(cors());


//app.use(express.static(path.join(__dirname, 'public')));



var korisnikRute = require('./rute/korisnik');
app.use('/korisnik', korisnikRute);

var zadatak = require('./rute/zadatak');
app.use('/zadatak',zadatak);



let port = 3000;

app.listen(3000, () =>
{
    console.log("Server je pokrenut na portu: 3000");
});

