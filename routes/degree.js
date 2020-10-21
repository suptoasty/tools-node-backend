const express = require("express");
const router = express.Router();
const { db } = require("../src/database");
const config = require("../config/config");

// GET all degrees
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

// GET degree by id
router.get("/:id", async (req, res, next) => {
  let id = req.params.id;
  let sql = "SELECT * FROM degree WHERE degree_id = ?;";

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
  degree.degree_id = undefined;
  console.log(degree);

  let errorMessage = validateDegree(degree); //validate request here
  if (errorMessage.length > 2) {
    res.status(406);
    res.send(errorMessage);
  } else {
    let sql = "INSERT INTO degree SET ?;";

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
  let id = req.params.id;
  let sql = "DELETE FROM degree WHERE degree_id = ?;";

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
  degree.degree_id = req.params.id;
  console.log(degree);

  let errorMessage = validateDegree(degree); //validate request here
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

// Degree_Plan
// GET all degree_plan items for a degree
router.get("/:id/items", async (req, res, next) => {
  let sql = "SELECT * FROM degree_plan WHERE degree = ?;";

  try {
    db.query(sql, [req.params.id], function (err, result) {
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

// GET specific degree_plan item
router.get("/:id/items/:item_id", async (req, res, next) => {
  let id = req.params.id;
  let sql = "SELECT * FROM degree_plan WHERE degree_plan_id = ?;";

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

// PUT degree_plan item
router.put("/:id/items/:item_id", async (req, res, next) => {
  let degreePlan = req.body;
  degreePlan.degree_plan_id = req.params.item_id;
  console.log(degreePlan);

  let errorMessage = validateDegreePlan(degreePlan); //validate request here
  if (errorMessage.length > 2) {
    res.status(406);
    res.send(errorMessage);
  } else {
    let sql = "UPDATE degree_plan SET ? WHERE degree_plan_id = ?";

    try {
      db.query(sql, [degreePlan, req.params.id], function (err, result) {
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

// POST degree_plan item
router.post("/:id/items", async (req, res, next) => {
  let degreePlan = req.body;
  degreePlan.degree_plan_id = undefined;
  degreePlan.degree = req.params.id;
  console.log(degreePlan);

  let errorMessage = validateDegreePlan(degreePlan); //validate request here
  if (errorMessage.length > 2) {
    res.status(406);
    res.send(errorMessage);
  } else {
    let sql = "INSERT INTO degree_plan SET ?;";

    try {
      db.query(sql, [degreePlan], function (err, result) {
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

// DELETE degree_plan item
router.delete("/:id/items/:degree_plan_id", async (req, res, next) => {
  let sql = "DELETE FROM degree_plan WHERE degree_plan_id = ?;";

  try {
    db.query(sql, [req.params.degree_plan_id], function (err, result) {
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

// validate request here...returns error message
function validateDegree(degree) {
  var errorMessage = "[";

  //if(degree.degree_attribute != undefined) {
  //    errorMessage += '{"attributeName":"degree_attribute" , "message":"Must have attribute"}';

  errorMessage += "]";
  return errorMessage;
}

function validateDegreePlan(degreePlan) {
  var errorMessage = "[";

  //if(degree.degree_attribute != undefined) {
  //    errorMessage += '{"attributeName":"degree_attribute" , "message":"Must have attribute"}';

  errorMessage += "]";
  return errorMessage;
}

module.exports = {
  degreeRouter: router,
};
