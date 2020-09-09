const mysql = require('mysql');
const { database } = require('../config');

//connection pool for successive queries...going to use for setup
const db = mysql.createPool({
    host: database.hostname,
    user: database.username,
    password: database.password,
    database: database.databasename,
    connectionLimit: 10,
});



// add to sql to create default databse
async function createDB(name = "courses") {   
    try {
        let query = await db.query('create database if not exists '+ name +';');
        query.on('error', (err) => {
            throw new Error(err);
        });

        query = await db.query(`CREATE TABLE IF NOT EXISTS `+ name +`.courseslist(
            course_id int(255) NOT NULL AUTO_INCREMENT,
            course_dept varchar(255) NOT NULL,
            course_num varchar(255) NOT NULL,
            course_level varchar(255) NOT NULL,
            course_hours varchar(255) NOT NULL,
            course_name varchar(255) NOT NULL,
            course_desc varchar(255) NOT NULL,
            PRIMARY KEY (course_id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`
        );
        query.on('error', (err) => {
            throw new Error(err);
        });

        //other tables here

    } catch (error) {
        console.log(error);
    }            
}

async function deleteDB(name = "courses") {
    try {
        let query = await db.query(`DROP DATABASE IF EXISTS `+ name +`;`);
        query.on('error', (err) => {
            throw new Error(err);
        });
        
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    db: db,
    createDB: createDB,
    deleteDB: deleteDB,
}
