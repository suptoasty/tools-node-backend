const express = require("express");
const router = express.Router();
const { db } = require("../src/database");
const config = require("../config/config");

// TODO: GET all degree_planPlans
router.get("/", function (req, res, next) {
  let sql = "SELECT * FROM degree_plan;";

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

// TODO: GET degree_plans by page

// GET degree_plan by id
router.get("/:id", async (req, res, next) => {
  let id = req.params.id;
  let sql = "SELECT * FROM degree_plan WHERE degree_plan_id = ?;";

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

// POST degree_plan
router.post("/", async (req, res, next) => {
  let degree_plan = req.body;
  console.log(degree_plan);

  let errorMessage = validate(degree_plan); //validate request here
  if (errorMessage.length > 2) {
    res.status(406);
    res.send(errorMessage);
  } else {
    let sql =
      "INSERT INTO " + config.database.databasename + ".degree_plan SET ?;";

    try {
      db.query(sql, [degree_plan], function (err, result) {
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

// DELETE degree_plan with id
router.delete("/:id", async (req, res, next) => {
  console.log("DELETE at /degree_plans/" + req.params.id);
  let id = req.params.id;
  let sql =
    "DELETE FROM " +
    config.database.databasename +
    ".degree_plan WHERE degree_plan_id = ?;";

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

// PUT degree_plan with id
router.put("/:id", async (req, res, next) => {
  let degree_plan = req.body;
  console.log(degree_plan);

  let errorMessage = validate(degree_plan); //validate request here
  if (errorMessage.length > 2) {
    res.status(406);
    res.send(errorMessage);
  } else {
    let sql = "UPDATE degree_plan SET ? WHERE degree_plan_id = ?";

    try {
      db.query(sql, [degree_plan, req.params.id], function (err, result) {
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
function validate(degree_plan) {
  var errorMessage = "[";

  //if(degree_plan.degree_plan_attribute != undefined) {
  //    errorMessage += '{"attributeName":"degree_plan_attribute" , "message":"Must have attribute"}';

  errorMessage += "]";
  return errorMessage;
}

module.exports = {
  degreePlanRouter: router,
};
