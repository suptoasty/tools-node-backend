const enableDebug = false;
const apiName = 'courseapi'; // EX: url:port/apiName/routes

// MySQL information, BAD FORM, but will get us going
const database = {
  hostname: "t1-database.czjofbims6cw.us-west-2.rds.amazonaws.com",
  //port: 3306,
  username: "admin",
  password: "passwordt1",
  databasename: "courses", // must be database name EX: courses or courseList
  autoInit: true
}

module.exports = {
  apiName: apiName,
  database: database,
  enableDebug: enableDebug,
};