var sqlite3 = require('sqlite3').verbose();

var putanja = __dirname;
var pom = putanja.replace('config','baza.db');

var db = new sqlite3.Database(pom, (err)=>
{
        if(err)
                console.log(err.message);
        else
                console.log('Database connected');
})

function CloseConnection()
{
        db.close((err) =>
        {
                if(err)
                        console.err(err.message);
                else
                        console.log('Database disconnected.');
        })
}

module.exports.db = db;
module.exports.CloseConnection = CloseConnection;
