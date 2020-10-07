const createError = require("http-errors");
const express = require("express");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const { indexRouter } = require("./routes/index");
const { usersRouter } = require("./routes/users");
const { coursesRouter } = require("./routes/courses");
const { coursePlanRouter } = require("./routes/course-plan");
const { degreeRouter } = require("./routes/degree");
const bodyParser = require("body-parser");

const { apiName } = require("./config/config");

process.env.PORT = 3001; // port for api
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(logger("dev"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routes setup
app.use("/" + apiName + "/", indexRouter);
app.use("/" + apiName + "/courses/", coursesRouter);
app.use("/" + apiName + "/users/", usersRouter);
app.use("/" + apiName + "/course-plan/", coursePlanRouter);
app.use("/" + apiName + "/degrees/", degreeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
