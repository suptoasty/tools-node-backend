const mysql = require('mysql');
const { database } = require('../config');

// the database we are going to use
const db = mysql.createConnection({
    host: database.hostname,
    user: database.username,
    password: database.password,
    database: database.database,
});

db.connect((err)=> {
    if(err){
        console.log('Error connecting to Db');
        return;
      }
      console.log('Connection established');
});

db.query('SELECT * FROM test', (err, rows) => {
    if(err) throw err;
    console.log("DATA");
    console.log(rows);
});

db.end((err)=> {
    if(err) {
        console.log("Error Ending Connection");
        return;
    }
    console.log("Ending Connection");
});
    
// create default database
// async function createDefaultDatabase(name = 'testdb') {
//     let conn = dbPool.getConnection();
    
//     let sql = `CREATE DATABASE [IF NOT EXISTS] ` + name + `;`;
//     await conn.query(sql);
// };
// createDefaultDatabase();

module.exports = {
    db: db,
    // createDB: createDefaultDatabase,
}
