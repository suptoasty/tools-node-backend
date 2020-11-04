const express = require("express");
const router = express.Router();
const { db, stdQuery, stdQueryPut, stdQueryPost } = require("../src/database");

// GET all courses
router.get("/", async (req, res, next) => {
  let sql = "SELECT * FROM course;";
  stdQuery(res, sql, []);
});

// GET course by id
router.get("/:id", async (req, res, next) => {
  let id = req.params.id;
  let sql = "SELECT * FROM course WHERE course_id = ?;";
  sql += "SELECT * FROM course_term WHERE course_id = ?;";

  try {
    db.query(sql, [id, id], function (err, result) {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        result[0][0].terms = result[1];
        res.json(result[0]);
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
  let course_terms = course.terms;
  delete course.terms;
  delete course.course_id;
  console.log(course);
  console.log(course_terms);

  let errorMessage = validate(course); //validate request here
  if (errorMessage.length > 2) {
    res.status(406);
    res.send(errorMessage);
  } else {
    let sql = "INSERT INTO course SET ?;";

    try {
      db.query(sql, [course], function (err, result) {
        if (err) {
          res.status(500);
          res.send(err);
        } else {
          course_id = result.insertId;
          //create course_terms
          if (course_terms != undefined) {
            sql = "";
            queryItems = [];
            course_terms.forEach((value, index, array) => {
              value.course_id = course_id;
              value.term_id = value.term;
              delete value.term;
              sql += "INSERT INTO course_term SET ?;";
              queryItems.push(value);
            });
            db.query(sql, queryItems, function (err, result) {
              if (err) {
                res.status(500);
                res.send(err);
              } else {
                res.json({ id: course_id });
              }
            });
          } else {
            res.json({ id: course_id });
          }
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
  let id = req.params.id;
  let sql = "DELETE FROM course WHERE course_id = ?;";
  stdQuery(res, sql, [id]);
});

// PUT course with id
router.put("/:id", async (req, res, next) => {
  let course = req.body;
  let course_id = req.params.id;
  let course_terms = course.terms;
  delete course.terms;
  course.course_id = course_id;
  console.log(course);

  let errorMessage = validate(course); //validate request here
  if (errorMessage.length > 2) {
    res.status(406);
    res.send(errorMessage);
  } else {
    let sql = "UPDATE course SET ? WHERE course_id = ?";

    try {
      db.query(sql, [course, course_id], function (err, result) {
        if (err) {
          res.status(500);
          res.send(err);
        } else {
          // delete course_terms and add new course_terms
          if (course_terms != undefined) {
            sql = "DELETE FROM course_term WHERE course_id = ?;";
            queryItems = [course_id];

            course_terms.forEach((value, index, array) => {
              value.course_id = course_id;
              value.term_id = value.term;
              delete value.term;
              sql += "INSERT INTO course_term SET ?;";
              queryItems.push(value);
            });
            db.query(sql, queryItems, function (err, result2) {
              if (err) {
                res.status(500);
                res.send(err);
              } else {
                res.json(result);
              }
            });
          }
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
  coursesRouter: router,
};
