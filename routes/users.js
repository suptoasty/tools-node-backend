const express = require("express");
const router = express.Router();
const { db } = require("../src/database");

// log a user in
router.post("/login", async (req, res, next) => {
  // change to allow for session token in database
  // ensure password is immediatly encrypted ??? if time

  let user = req.body;

  let errorMessage = await validate(user); //validate request here
  if (errorMessage.length > 2) {
    res.status(406);
    res.send(errorMessage);
  } else {
    let sql = "INSERT INTO courses.users SET ?;";

    try {
      db.query(sql, [user], function (err, result) {
        if (err) {
          res.status(500);
          res.send(err);
        } else {
          res.json({ id: result.insertId });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500);
      res.send(error);
    }
  }
});

// log current user out
router.post("/logout", function (req, res, next) {
  res.end("post at logout");
});

// create a new user
router.post("/", function (req, res, next) {
  res.end("post at users");
});

// validate request here...returns error message
function validate(user) {
  let errorMessage = "[";

  if (!user.userName) {
    errorMessage += "Invalid User Name!\n";
  }

  if (!user.userPassword) {
    errorMessage += "Invalid User Password!";
  }

  errorMessage += "]";
  return errorMessage;
}

module.exports = {
  usersRouter: router,
};
