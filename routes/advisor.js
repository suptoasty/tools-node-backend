const express = require("express");
const router = express.Router();
const { db } = require("../src/database");
const config = require("../config/config");

// TODO: GET all advisors
router.get("/", async (req, res, next) => {
  let sql = "SELECT * FROM advisor;";

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

// TODO: GET advisors by page

// GET advisor by id
router.get("/:id", async (req, res, next) => {
  let id = req.params.id;
  let sql = `SELECT * FROM user RIGHT JOIN advisor ON user.user_advisor=advisor.advisor_id WHERE advisor_id = ?;`;

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

// POST advisor
router.post("/", async (req, res, next) => {
  let advisor = req.body;
  console.log(advisor);

  let errorMessage = validate(advisor); //validate request here
  if (errorMessage.length > 2) {
    res.status(406);
    res.send(errorMessage);
  } else {
    let sql = "INSERT INTO advisor SET ?;";

    try {
      db.query(sql, [advisor], function (err, result) {
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

// DELETE advisor with id
router.delete("/:id", async (req, res, next) => {
  let id = req.params.id;
  let sql = "DELETE FROM advisor WHERE advisor_id = ?;";

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

// PUT advisor with id
router.put("/:id", async (req, res, next) => {
  let advisor = req.body;
  console.log(advisor);

  let errorMessage = validate(advisor); //validate request here
  if (errorMessage.length > 2) {
    res.status(406);
    res.send(errorMessage);
  } else {
    let sql = "UPDATE advisor SET ? WHERE advisor_id = ?";

    try {
      db.query(sql, [advisor, req.params.id], function (err, result) {
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
function validate(advisor) {
  var errorMessage = "[";

  //if(advisor.advisor_attribute != undefined) {
  //    errorMessage += '{"attributeName":"advisor_attribute" , "message":"Must have attribute"}';

  errorMessage += "]";
  return errorMessage;
}

module.exports = {
  advisorRouter: router,
};
