const express = require("express");
const router = express.Router();
const { db, stdQuery, stdQueryPut, stdQueryPost } = require("../src/database");

// GET all students
router.get("/", async (req, res, next) => {
  let sql = "SELECT * FROM student;";
  stdQuery(res, sql, []);
});

// GET student by id
router.get("/:id", async (req, res, next) => {
  let id = req.params.id;
  let sql =
    "SELECT * FROM user RIGHT JOIN student ON user.user_student=student.student_id WHERE student_id = ?; ";
  stdQuery(res, sql, [id]);
});

// POST student
router.post("/", async (req, res, next) => {
  let student = req.body;
  console.log(student);
  let sql = "INSERT INTO student SET ?;";
  stdQueryPost(res, sql, [student], validate(student));
});

// DELETE student with id
router.delete("/:id", async (req, res, next) => {
  let id = req.params.id;
  let sql = "DELETE FROM student WHERE student_id = ?;";
  stdQuery(res, sql, [id]);
});

// PUT student with id
router.put("/:id", async (req, res, next) => {
  let student = req.body;
  console.log(student);
  let sql = "UPDATE student SET ? WHERE student_id = ?";
  stdQueryPut(res, sql, [student, req.params.id], validate(student));
});

// Validate STUDENT
function validate(student) {
  let errorMessage = "[";

  errorMessage += "]";
  return errorMessage;
}

module.exports = {
  studentRouter: router,
};
