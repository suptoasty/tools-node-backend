const mysql = require('mysql');
const { database, init } = require('../config/config');

//connection pool for successive queries...going to use for setup
const db = mysql.createPool({
    host: database.hostname,
    user: database.username,
    password: database.password,
    database: database.databasename,
    connectionLimit: 10,
});

const con = mysql.createConnection({
    host: database.hostname,
    user: database.username,
    password: database.password
});



async function createDB(name = database.databasename) {   
    try {
        con.query('CREATE DATABASE IF NOT EXISTS '+ name +';', function(err, result) {
            if (err) throw new Error(err);
        });

        con.query(`CREATE TABLE IF NOT EXISTS `+ name +`.courseslist(
            course_id int(255) NOT NULL AUTO_INCREMENT,
            course_dept varchar(255) NOT NULL,
            course_num varchar(255) NOT NULL,
            course_level varchar(255) NOT NULL,
            course_hours varchar(255) NOT NULL,
            course_name varchar(255) NOT NULL,
            course_desc varchar(255) NOT NULL,
            PRIMARY KEY (course_id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`, 
            function(err, result) {
                if (err) throw new Error(err);
        });

        //other tables here

    } catch (error) {
        console.log(error);
    }            
}

async function deleteDB(name = database.databasename) {
    try {
        con.query(`DROP DATABASE IF EXISTS `+ name +`;`, function(err, result) {
            if (err) throw new Error(err);
        });
        
    } catch (error) {
        console.log(error);
    }
}

if(init) {
    createDB(database.databasename);
    init = false;
}

module.exports = {
    db: db,
    createDB: createDB,
    deleteDB: deleteDB,
}
