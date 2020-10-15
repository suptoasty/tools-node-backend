const express = require("express");
const router = express.Router();
const { db } = require("../src/database");
const config = require("../config/config");

// GET all courseplans
router.get("/", function (req, res, next) {
  let sql = "SELECT * FROM course_plan;";

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

// GET courseplans by student_id
router.get("/student/:id", async (req, res, next) => {
  let id = req.params.id;
  let sql = "SELECT * FROM course_plan WHERE student = ?;";

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

// GET courseplan by course_plan_id
router.get("/:id", async (req, res, next) => {
  let id = req.params.id;
  let sql = "SELECT * FROM course_plan WHERE course_plan_id = ?;";

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

// POST courseplan
router.post("/", async (req, res, next) => {
  let course_plan = req.body;
  console.log(course_plan);

  let errorMessage = validate(course_plan); //validate request here
  if (errorMessage.length > 2) {
    res.status(406);
    res.send(errorMessage);
  } else {
    let sql = "INSERT INTO course_plan SET ?;";

    try {
      db.query(sql, [course_plan], function (err, result) {
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

// DELETE courseplan with id
router.delete("/:id", async (req, res, next) => {
  console.log("DELETE at /courses/" + req.params.id);
  let id = req.params.id;
  let sql = "DELETE FROM course_plan WHERE course_id = ?;";

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

// PUT courseplan with id
router.put("/:id", async (req, res, next) => {
  let course_plan = req.body;
  console.log(course_plan);

  let errorMessage = validate(course_plan); //validate request here
  if (errorMessage.length > 2) {
    res.status(406);
    res.send(errorMessage);
  } else {
    let sql = "UPDATE course_plan SET ? WHERE course_plan_id = ?";

    try {
      db.query(sql, [course_plan, req.params.id], function (err, result) {
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




// GET all course plan items for a course plan
router.get('/:id/items', async (req, res, next) => {
  let id = req.params.id;
  let sql = "SELECT * FROM course_plan_item WHERE plan = ?;";

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

// GET specific course plan item
router.get('/items/:item_id', async (req, res, next) => {
  let id = req.params.id;
  let item_id = req.params.item_id;
  let sql = "SELECT * FROM course_plan_item WHERE course_plan_item_id = ?;";

  try {
    db.query(sql, [item_id], function (err, result) {
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

// PUT course plan item
router.put(':id/items/:item_id', async (req, res, next) => {
  let course_plan = req.body;
  course_plan.plan = req.params.id;
  course_plan.course_plan_item_id = req.params.item_id;
  console.log(course_plan);

  let errorMessage = validate(course_plan); //validate request here
  if (errorMessage.length > 2) {
    res.status(406);
    res.send(errorMessage);
  } else {
    let sql = "UPDATE course_plan_item SET ? WHERE course_plan_id = ?";

    try {
      db.query(sql, [course_plan, req.params.item_id], function (err, result) {
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

// POST course plan item
router.post(':id/items');

// DELETE course plan item
router.delete(':id/items/:item_id');





// validate request here...returns error message
function validate(course) {
  var errorMessage = "[";

  //if(course.course_attribute != undefined) {
  //    errorMessage += '{"attributeName":"course_attribute" , "message":"Must have attribute"}';

  errorMessage += "]";
  return errorMessage;
}

function validate_item(cp_item) {

}

module.exports = {
  coursePlanRouter: router,
};
