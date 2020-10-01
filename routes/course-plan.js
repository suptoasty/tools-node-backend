const express = require("express");
const router = express.Router();
const { db } = require("../src/database");

// TODO: GET all courses
router.get("/", function (req, res, next) {
  let sql = "SELECT * FROM courseslist;";

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

// TODO: GET courses by page

// GET course by id
router.get("/:id", async (req, res, next) => {
  let id = req.params.id;
  let sql = "SELECT * FROM courseslist WHERE course_id = ?;";

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

// POST course
router.post("/", async (req, res, next) => {
  let course = req.body;
  console.log(course);

  let errorMessage = validate(course); //validate request here
  if (errorMessage.length > 2) {
    res.status(406);
    res.send(errorMessage);
  } else {
    let sql = "INSERT INTO courses.courseslist SET ?;";

    try {
      db.query(sql, [course], function (err, result) {
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

// DELETE course with id
router.delete("/:id", async (req, res, next) => {
  console.log("DELETE at /courses/" + req.params.id);
  let id = req.params.id;
  let sql = "DELETE FROM courses.courseslist WHERE course_id = ?;";

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

// PUT course with id
router.put("/:id", async (req, res, next) => {
  let course = req.body;
  console.log(course);

  let errorMessage = validate(course); //validate request here
  if (errorMessage.length > 2) {
    res.status(406);
    res.send(errorMessage);
  } else {
    let sql = "UPDATE courseslist SET ? WHERE course_id = ?";

    try {
      db.query(sql, [course, req.params.id], function (err, result) {
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
function validate(course) {
  var errorMessage = "[";

  //if(course.course_attribute != undefined) {
  //    errorMessage += '{"attributeName":"course_attribute" , "message":"Must have attribute"}';

  errorMessage += "]";
  return errorMessage;
}

module.exports = {
  coursePlanRouter: router,
};
