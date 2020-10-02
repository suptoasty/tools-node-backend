const mysql = require("mysql");
const { database, init } = require("../config/config");

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
  password: database.password,
});

async function createDB(name = database.databasename) {
  try {
    //db
    con.query("CREATE DATABASE IF NOT EXISTS " + name + ";", function (
      err,
      result
    ) {
      if (err) throw new Error(err);
    });

    //degree
    con.query(
      `CREATE TABLE IF NOT EXISTS ` +
        name +
        `.degree(
            degree_id int(255) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            degree_name varchar(255) NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
      function (err, result) {
        if (err) throw new Error(err);
      }
    );

    //semester
    con.query(
      `CREATE TABLE IF NOT EXISTS ` +
        name +
        `.semester(
            semester_id int(255) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            semester_name varchar(255) NOT NULL,
            semester_start DATE NOT NULL,
            semester_end DATE NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
      function (err, result) {
        if (err) throw new Error(err);
      }
    );

    //advisor
    con.query(
      `CREATE TABLE IF NOT EXISTS ` +
        name +
        `.advisor(
            advisor_id int(255) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            advisor_fname varchar(255) NOT NULL,
            advisor_lname varchar(255) NOT NULL,
            advisor_initial varchar(255)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
      function (err, result) {
        if (err) throw new Error(err);
      }
    );

    //student
    con.query(
      `CREATE TABLE IF NOT EXISTS ` +
        name +
        `.student(
            student_id int(255) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            student_fname varchar(255) NOT NULL,
            student_lname varchar(255) NOT NULL,
            student_initial varchar(255),
            advisor int(255) UNSIGNED NOT NULL,
            FOREIGN KEY(advisor) REFERENCES advisor(advisor_id) ON UPDATE RESTRICT
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
      function (err, result) {
        if (err) throw new Error(err);
      }
    );

    //coursesemester
    con.query(
      `CREATE TABLE IF NOT EXISTS ` +
        name +
        `.course_semester(
            course_semester_id int(255) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            course int(255) UNSIGNED NOT NULL,
            semester int(255) UNSIGNED NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
      function (err, result) {
        if (err) throw new Error(err);
      }
    );

    //course
    con.query(
      `CREATE TABLE IF NOT EXISTS ` +
        name +
        `.courseslist(
            course_id int(255) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            course_dept varchar(255) NOT NULL,
            course_num varchar(255) NOT NULL,
            course_level varchar(255) NOT NULL,
            course_hours varchar(255) NOT NULL,
            course_name varchar(255) NOT NULL,
            course_desc varchar(255) NOT NULL,
            semester int(255) UNSIGNED,
            FOREIGN KEY(semester) REFERENCES course_semester(course_semester_id) ON DELETE CASCADE ON UPDATE RESTRICT
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
      function (err, result) {
        if (err) throw new Error(err);
      }
    );

    //add foreign keys to course_semester
    con.query(
      `ALTER TABLE ` +
        name +
        `.course_semester ADD CONSTRAINT FOREIGN KEY(course) REFERENCES courseslist(course_id) ON DELETE CASCADE ON UPDATE RESTRICT;`,
      function (err, result) {
        if (err) throw new Error(err);
      }
    );
    con.query(
      `ALTER TABLE ` +
        name +
        `.course_semester ADD CONSTRAINT FOREIGN KEY(semester) REFERENCES semester(semester_id) ON DELETE CASCADE ON UPDATE RESTRICT;`,
      function (err, result) {
        if (err) throw new Error(err);
      }
    );

    //user
    con.query(
      `CREATE TABLE IF NOT EXISTS ` +
        name +
        `.user(
            user_id int(255) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            user_name varchar(100) NOT NULL,
            user_password varchar(100) NOT NULL,
            student int(255) UNSIGNED NOT NULL,
            advisor int(255) UNSIGNED NOT NULL,
            FOREIGN KEY(student) REFERENCES student(student_id) ON DELETE CASCADE ON UPDATE RESTRICT,
            FOREIGN KEY(advisor) REFERENCES advisor(advisor_id) ON DELETE CASCADE ON UPDATE RESTRICT
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
      function (err, result) {
        if (err) throw new Error(err);
      }
    );

    //studentdegree
    con.query(
      `CREATE TABLE IF NOT EXISTS ` +
        name +
        `.student_degree(
            student_degree_id int(255) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            student int(255) UNSIGNED NOT NULL,
            degree int(255) UNSIGNED NOT NULL,
            FOREIGN KEY(student) REFERENCES student(student_id) ON DELETE CASCADE ON UPDATE RESTRICT,
            FOREIGN KEY(degree) REFERENCES degree(degree_id) ON DELETE CASCADE ON UPDATE RESTRICT
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
      function (err, result) {
        if (err) throw new Error(err);
      }
    );

    //courseplan
    // what about adding multiple courses to plan???
    con.query(
      `CREATE TABLE IF NOT EXISTS ` +
        name +
        `.course_plan(
            course_plan_id int(255) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            student int(255) UNSIGNED NOT NULL,
            FOREIGN KEY(student) REFERENCES student(student_id) ON DELETE CASCADE ON UPDATE RESTRICT
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
      function (err, result) {
        if (err) throw new Error(err);
      }
    );

    //NOT NEEDED
    //advisor_student
    // con.query(
    //   `CREATE TABLE IF NOT EXISTS ` +
    //     name +
    //     `.student_advisor(
    //         student_advisor int(255) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    //         student int(255) UNSIGNED NOT NULL,
    //         advisor int(255) UNSIGNED NOT NULL,
    //         FOREIGN KEY(student) REFERENCES student(student_id)
    //         ON DELETE CASCADE
    //         ON UPDATE RESTRICT,
    //         FOREIGN KEY(advisor) REFERENCES advisor(advisor_id) ON DELETE CASCADE ON UPDATE RESTRICT
    //     ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
    //   function (err, result) {
    //     if (err) throw new Error(err);
    //   }
    // );
  } catch (error) {
    console.log(error);
  }
}

async function deleteDB(name = database.databasename) {
  try {
    con.query(`DROP DATABASE IF EXISTS ` + name + `;`, function (err, result) {
      if (err) throw new Error(err);
    });
  } catch (error) {
    console.log(error);
  }
}

if (init) {
  createDB(database.databasename);
}

module.exports = {
  db: db,
  createDB: createDB,
  deleteDB: deleteDB,
};
