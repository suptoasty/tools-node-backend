const express = require("express");
const router = express.Router();
const { db, stdQuery, stdQueryPut, stdQueryPost } = require("../src/database");

// GET all semesters
router.get("/", async (req, res, next) => {
  let sql =
    "SELECT * FROM semester JOIN term ON (term.term_id = semester.semester_term);";
  stdQuery(res, sql, []);
});

// GET semester by id
router.get("/:id", async (req, res, next) => {
  let id = req.params.id;
  let sql =
    "SELECT * FROM semester JOIN term ON (term.term_id = semester.semester_term) WHERE semester_id = ?;";
  stdQuery(res, sql, [id]);
});

// POST semester
router.post("/", async (req, res, next) => {
  let semester = req.body;
  semester.semester_id = undefined;
  console.log(semester);

  let sql = "INSERT INTO semester SET ?;";
  stdQueryPost(res, sql, [semester], validate(semester));
});

// DELETE semester
router.delete("/:id", async (req, res, next) => {
  let id = req.params.id;
  let sql = "DELETE FROM semester WHERE semester_id = ?;";
  stdQuery(res, sql, [id]);
});

// PUT semester with id
router.put("/:id", async (req, res, next) => {
  let semester = req.body;
  semester.semester_id = req.params.id;
  console.log(semester);

  let sql = "UPDATE semester SET ? WHERE semester_id = ?";
  stdQueryPut(res, sql, [semester, req.params.id], validate(semester));
});

// Validate SEMESTER
function validate(semester) {
  let errorMessage = "[";

  errorMessage += "]";
  return errorMessage;
}

module.exports = {
  semesterRouter: router,
};
