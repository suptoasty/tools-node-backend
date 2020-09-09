const mysql = require('mysql');
const { database } = require('../config');

//connection pool for successive queries...going to use for setup
const dbPool = mysql.createPool({
    host: database.hostname,
    user: database.username,
    password: database.password,
    database: database.databasename,
    connectionLimit: 10,
});

//database connection
const db = mysql.createConnection({
    host: database.hostname,
    user: database.username,
    password: database.password,
    database: database.database,
})

// add to sql to create default databse
async function createDB(name = "courses") {   
    try {
        let res = await dbPool.query(`CREATE DATABASE IF NOT EXISTS `+ name +`;`).on('error', (err) => {
            console.log(err);
            throw err;
        })

        
        await dbPool.query(`CREATE TABLE IF NOT EXISTS`+ name +`.courselist(
        id int NOT NULL AUTO_INCREMENT,
        name varchar(255),
        PRIMARY KEY (id)
        );`);

        //other tables here
    } catch (error) {
        console.log(error);
    }            
}

function deleteDB(name = "courses") {
    return dbPool.getConnection((err, connection) => {
        try {
            connection.query(`DROP DATABASE IF EXISTS `+name+`;`);
        } catch (error) {
            throw error;
        }
    });
}

module.exports = {
    db: db,
    dbPool: dbPool,
    createDB: createDB,
    deleteDB: deleteDB,
}
