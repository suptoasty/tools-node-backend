const { request } = require("express");
const express = require("express");
const router = express.Router();
const { db } = require("../src/database");
const config = require("../config/config");

// GET all students
router.get("/", async (req, res, next) => {
  let sql = "SELECT * FROM student;";

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

// GET student by id
router.get("/:id", async (req, res, next) => {
  let id = req.params.id;
  let sql =
    "SELECT * FROM user RIGHT JOIN student ON user.user_student=student.student_id WHERE student_id = ?; ";

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

// POST student
router.post("/", async (req, res, next) => {
  let student = req.body;
  console.log(student);

  let errorMessage = validate(student); //validate request here
  if (errorMessage.length > 2) {
    res.status(406);
    res.send(errorMessage);
  } else {
    let sql = "INSERT INTO student SET ?;";

    try {
      db.query(sql, [student], function (err, result) {
        if (err) {
          console.log(err);
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

// DELETE student with id
router.delete("/:id", async (req, res, next) => {
  let id = req.params.id;
  let sql = "DELETE FROM student WHERE student_id = ?;";

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

// PUT student with id
router.put("/:id", async (req, res, next) => {
  let student = req.body;
  console.log(student);

  let errorMessage = validate(student); //validate request here
  if (errorMessage.length > 2) {
    res.status(406);
    res.send(errorMessage);
  } else {
    let sql = "UPDATE student SET ? WHERE student_id = ?";

    try {
      db.query(sql, [student, req.params.id], function (err, result) {
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
function validate(student) {
  let errorMessage = "[";

  errorMessage += "]";
  return errorMessage;
}

module.exports = {
  studentRouter: router,
};
