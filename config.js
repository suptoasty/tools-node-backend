const enableDebug = false;
const apiName = 'courseapi'; // EX: url:port/apiName/routes

// MySQL information, BAD FORM, but will get us going
const database = {
  hostname: "localhost",
  //port: 3306,
  username: "root",
  password: "",
  databasename: "courses", // must be database name EX: courses or courseList
  autoInit: true
};

module.exports = {
  apiName: apiName,
  database: database,
  enableDebug: enableDebug,
};