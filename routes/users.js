const { request } = require("express");
const express = require("express");
const router = express.Router();
const { db } = require("../src/database");
const config = require("../config/config");

// GET user by id
router.get("/:id", async (req, res, next) => {
  let id = req.params.id;
  let sql = "SELECT * FROM user WHERE user_id = ?;";

  let range = req.params.id.split("-");

  try {
    db.query(sql, [id], function (err, result) {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send(error);
  }
});

// POST user
router.post("/", async (req, res, next) => {
  let user = req.body;
  console.log(user);

  let errorMessage = validate(user); //validate request here
  if (errorMessage.length > 2) {
    res.status(406);
    res.send(errorMessage);
  } else {
    let sql = "INSERT INTO " + config.database.databasename + ".user SET ?;";

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

// DELETE user with id
router.delete("/:id", async (req, res, next) => {
  console.log("DELETE at /users/" + req.params.id);
  let id = req.params.id;
  let sql =
    "DELETE FROM " + config.database.databasename + ".user WHERE user_id = ?;";

  try {
    db.query(sql, [id], function (err, result) {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send(error);
  }
});

// PUT user with id
router.put("/:id", async (req, res, next) => {
  let user = req.body;
  console.log(user);

  let errorMessage = validate(user); //validate request here
  if (errorMessage.length > 2) {
    res.status(406);
    res.send(errorMessage);
  } else {
    let sql = "UPDATE user SET ? WHERE user_id = ?";

    try {
      db.query(sql, [user, req.params.id], function (err, result) {
        if (err) {
          res.status(500);
          res.send(err);
        } else {
          res.json(result);
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500);
      res.send(error);
    }
  }
});

// validate request here...returns error message
function validate(user) {
  var errorMessage = "[";

  if (user.user_name === "") {
    errorMessage += "User Name must not be null!";
  }
  if (user.user_email === "") {
    errorMessage += "User Email must not be null!";
  }
  if (user.user_password === "") {
    errorMessage += "User Password must not be null!";
  }

  //if(advisor.advisor_attribute != undefined) {
  //    errorMessage += '{"attributeName":"advisor_attribute" , "message":"Must have attribute"}';

  errorMessage += "]";
  return errorMessage;
}

module.exports = {
  usersRouter: router,
};
