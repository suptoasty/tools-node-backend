const mysql = require('mysql');
const { database } = require('../config');

// the database we are going to use
const db = mysql.createPool({
    host: database.hostname,
    user: database.username,
    password: database.password,
    database: database.database,
});

function createDB(name = "testdb") {
    let sql = 'CREATE DATABASE IF NOT EXISTS '+ name +';';
    db.getConnection((err, connection) => {
        if(err) {
            callback(err);
            return;
        }
        
        connection.query(sql, (err, results) => {
            connection.release();
            if(err) throw err;
        });
        connection.on('error', (err) => {
            callback(true);
            return;
        });
    });
}

module.exports = {
    db: db,
    createDB: createDB,
}
