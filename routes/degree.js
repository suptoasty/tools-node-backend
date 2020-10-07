const express = require("express");
const router = express.Router();
const { db } = require("../src/database");
const config = require("../config/config");

// TODO: GET all degrees
router.get("/", function (req, res, next) {
  let sql = "SELECT * FROM degree;";

  try {
    db.query(sql, [], function (err, result) {
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

// TODO: GET degrees by page

// GET degree by id
router.get("/:id", async (req, res, next) => {
  let id = req.params.id;
  let sql = "SELECT * FROM degree WHERE degree_id = ?;";

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

// POST degree
router.post("/", async (req, res, next) => {
  let degree = req.body;
  console.log(degree);

  let errorMessage = validate(degree); //validate request here
  if (errorMessage.length > 2) {
    res.status(406);
    res.send(errorMessage);
  } else {
    let sql = "INSERT INTO " + config.database.databasename + ".degree SET ?;";

    try {
      db.query(sql, [degree], function (err, result) {
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

// DELETE degree with id
router.delete("/:id", async (req, res, next) => {
  console.log("DELETE at /degrees/" + req.params.id);
  let id = req.params.id;
  let sql =
    "DELETE FROM " +
    config.database.databasename +
    ".degree WHERE degree_id = ?;";

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

// PUT degree with id
router.put("/:id", async (req, res, next) => {
  let degree = req.body;
  console.log(degree);

  let errorMessage = validate(degree); //validate request here
  if (errorMessage.length > 2) {
    res.status(406);
    res.send(errorMessage);
  } else {
    let sql = "UPDATE degree SET ? WHERE degree_id = ?";

    try {
      db.query(sql, [degree, req.params.id], function (err, result) {
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
function validate(degree) {
  var errorMessage = "[";

  //if(degree.degree_attribute != undefined) {
  //    errorMessage += '{"attributeName":"degree_attribute" , "message":"Must have attribute"}';

  errorMessage += "]";
  return errorMessage;
}

module.exports = {
  degreeRouter: router,
};
