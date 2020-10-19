const createError = require("http-errors");
const express = require("express");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const { indexRouter } = require("./routes/index");
const { authRouter } = require("./routes/auth");
const { advisorRouter } = require("./routes/advisor");
const { coursePlanRouter } = require("./routes/course-plan");
const { coursesRouter } = require("./routes/courses");
const { degreeRouter } = require("./routes/degree");
<<<<<<< HEAD
const { degreePlanRouter } = require("./routes/degree-plan");
const { advisorRouter } = require("./routes/advisor");
const { authRouter } = require("./routes/auth");
const { studentRouter } = require("./routes/students");
const bodyParser = require("body-parser");
=======
const { semesterRouter } = require("./routes/semester");
const { studentRouter } = require("./routes/student");
const { termRouter } = require("./routes/term");
const { usersRouter } = require("./routes/users");
>>>>>>> 1c620c95fa947acc0b79b80628ddf8bc3cb6a819

const { apiName } = require("./config/config");
process.env.PORT = 3001;
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
app.use("/" + apiName + "/advisor/", advisorRouter);
app.use("/" + apiName + "/auth/", authRouter);
app.use("/" + apiName + "/students/", studentRouter);
app.use("/" + apiName + "/course-plan/", coursePlanRouter);
app.use("/" + apiName + "/courses/", coursesRouter);
app.use("/" + apiName + "/degrees/", degreeRouter);
app.use("/" + apiName + "/semester/", semesterRouter);
app.use("/" + apiName + "/term/", termRouter);
app.use("/" + apiName + "/users/", usersRouter);

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
