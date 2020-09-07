const mysql = require('mysql');
const { database } = require('../config');

// the database we are going to use
const db = mysql.createConnection({
    host: database.hostname,
    user: database.user,
    password: database.password,
    port: database.port,
    database: database.database
});

// create default database
function createDefaultDatabase(name = 'testdb') {
    let sql = 'CREATE DATABASE ' + name;
    db.connect(function(err) {
        if(err) throw err;
        console.log("DB Connected!");
        db.query(sql, function(err, res) {
            if(err) throw err;
            console.log("Result: " + res);
        });
    });

};


module.exports = {
    db: db,
    createDB: createDefaultDatabase,
}
