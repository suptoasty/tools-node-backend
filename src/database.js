const mysql = require("mysql");
const { database, init } = require("../config/config");

//connection pool for successive queries...going to use for setup
const db = mysql.createPool({
  host: database.hostname,
  user: database.username,
  password: database.password,
  database: database.databasename,
  connectionLimit: 10,
  multipleStatements: true,
});

const con = mysql.createConnection({
  host: database.hostname,
  user: database.username,
  password: database.password,
});

async function createDB(name = database.databasename) {
  try {
    //db
    con.query("CREATE DATABASE IF NOT EXISTS " + name + ";", function (err, result) {
      if (err) throw new Error(err);
    });



    // degree
    con.query(
      `CREATE TABLE IF NOT EXISTS ` +
        name +
        `.degree(
            degree_id int(255) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            degree_name varchar(255) NOT NULL,
            degree_dept varchar(255) NOT NULL,
            degree_hours varchar(255) NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
      function (err, result) {
        if (err) throw new Error(err);
      }
    );

    // term
    con.query(
      `CREATE TABLE IF NOT EXISTS ` +
        name +
        `.term(
          term_id int(255) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
          term_name varchar(255) NOT NULL,
          term_abbr varchar(255) NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
      function (err, result) {
        if (err) throw new Error(err);
      }
    );

    // semester
    con.query(
      `CREATE TABLE IF NOT EXISTS ` +
        name +
        `.semester(
            semester_id int(255) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            semester_name varchar(255) NOT NULL,
            semester_start DATE NOT NULL,
            semester_end DATE NOT NULL,
            semester_term int(255) UNSIGNED NOT NULL,
            FOREIGN KEY(semester_term) REFERENCES term(term_id) ON UPDATE RESTRICT
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
      function (err, result) {
        if (err) throw new Error(err);
      }
    );

    // advisor
    con.query(
      `CREATE TABLE IF NOT EXISTS ` +
        name +
        `.advisor(
            advisor_id int(255) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            advisor_fname varchar(255) NOT NULL,
            advisor_lname varchar(255) NOT NULL,
            advisor_initial varchar(255),
            advisor_department varchar(255)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
      function (err, result) {
        if (err) throw new Error(err);
      }
    );

    // student
    con.query(
      `CREATE TABLE IF NOT EXISTS ` +
        name +
        `.student(
            student_id int(255) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            student_fname varchar(255) NOT NULL,
            student_lname varchar(255) NOT NULL,
            student_initial varchar(255),
            student_graduation_date DATE NOT NULL,
            student_degree int(255) UNSIGNED,
            student_advisor int(255) UNSIGNED,
            FOREIGN KEY(student_advisor) REFERENCES advisor(advisor_id) ON UPDATE RESTRICT,
            FOREIGN KEY(student_degree) REFERENCES degree(degree_id) ON UPDATE RESTRICT
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
      function (err, result) {
        if (err) throw new Error(err);
      }
    );

    // course
    con.query(
      `CREATE TABLE IF NOT EXISTS ` +
        name +
        `.course(
          course_id int(255) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
          course_dept varchar(255) NOT NULL,
          course_num varchar(255) NOT NULL,
          course_level varchar(255) NOT NULL,
          course_hours varchar(255) NOT NULL,
          course_name varchar(255) NOT NULL,
          course_desc varchar(255) NOT NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
      function (err, result) {
        if (err) throw new Error(err);
      }
    );

    // course_term
    con.query(
      `CREATE TABLE IF NOT EXISTS ` +
        name +
        `.course_term (
          course_id int(255) UNSIGNED NOT NULL,
          term_id int(255) UNSIGNED NOT NULL,
          FOREIGN KEY(course_id) REFERENCES course(course_id) ON DELETE CASCADE ON UPDATE RESTRICT,
          FOREIGN KEY(term_id) REFERENCES term(term_id) ON DELETE CASCADE ON UPDATE RESTRICT
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
      function (err, result) {
        if (err) throw new Error(err);
      }
    );

    // user
    con.query(
      `CREATE TABLE IF NOT EXISTS ` +
        name +
        `.user(
            user_id int(255) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            user_name varchar(100) NOT NULL,
            user_password varchar(100) NOT NULL,
            user_email varchar(255) NOT NULL,
            user_student int(255) UNSIGNED,
            user_advisor int(255) UNSIGNED,
            FOREIGN KEY(user_student) REFERENCES student(student_id) ON DELETE CASCADE ON UPDATE RESTRICT,
            FOREIGN KEY(user_advisor) REFERENCES advisor(advisor_id) ON DELETE CASCADE ON UPDATE RESTRICT
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
      function (err, result) {
        if (err) throw new Error(err);
      }
    );

    // degree_plan
    con.query(
      `CREATE TABLE IF NOT EXISTS ` +
        name +
        `.degree_plan(
            degree_plan_id int(255) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            degree_plan_degree int(255) UNSIGNED NOT NULL,
            degree_plan_course int(255) UNSIGNED NOT NULL,
            FOREIGN KEY(degree_plan_degree) REFERENCES degree(degree_id) ON DELETE CASCADE ON UPDATE RESTRICT,
            FOREIGN KEY(degree_plan_course) REFERENCES course(course_id) ON DELETE CASCADE ON UPDATE RESTRICT
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
      function (err, result) {
        if (err) throw new Error(err);
      }
    );

    // course_plan
    con.query(
      `CREATE TABLE IF NOT EXISTS ` +
        name +
        `.course_plan(
            course_plan_id int(255) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            course_plan_last_updated DATETIME,
            course_plan_student int(255) UNSIGNED NOT NULL,
            FOREIGN KEY(course_plan_student) REFERENCES student(student_id) ON DELETE CASCADE ON UPDATE RESTRICT
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
      function (err, result) {
        if (err) throw new Error(err);
      }
    );

    // course_plan_item
    con.query(
      `CREATE TABLE IF NOT EXISTS ` +
        name +
        `.course_plan_item(
            course_plan_item_id int(255) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            course_plan_item_grade int(2),
            course_plan_item_status varchar(255),
            course_plan_item_plan int(255) UNSIGNED,
            course_plan_item_semester int(255) UNSIGNED,
            course_plan_item_course int(255) UNSIGNED,
            FOREIGN KEY(course_plan_item_plan) REFERENCES course_plan(course_plan_id) ON DELETE CASCADE ON UPDATE RESTRICT,
            FOREIGN KEY(course_plan_item_semester) REFERENCES semester(semester_id) ON UPDATE RESTRICT,
            FOREIGN KEY(course_plan_item_course) REFERENCES course(course_id) ON UPDATE RESTRICT
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
      function (err, result) {
        if (err) throw new Error(err);
      }
    );
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
