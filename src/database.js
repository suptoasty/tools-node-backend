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
        
        await dbPool.query(`CREATE TABLE IF NOT EXISTS `+ name +`.courseslist(
            course_id int(255) NOT NULL AUTO_INCREMENT,
            course_dept varchar(255) NOT NULL,
            course_num varchar(255) NOT NULL,
            course_level varchar(255) NOT NULL,
            course_hours varchar(255) NOT NULL,
            course_name varchar(255) NOT NULL,
            course_desc varchar(255) NOT NULL,
            PRIMARY KEY (course_id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`)
        .on('error', (err) => {
            console.log(err);
        });

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
