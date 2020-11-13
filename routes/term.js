const express = require("express");
const router = express.Router();
const { db, stdQuery, stdQueryPut, stdQueryPost } = require("../src/database");

// GET all terms
router.get("/", async (req, res, next) => {
  let sql = "SELECT * FROM term;";
  stdQuery(res, sql, []);
});

// GET term by id
router.get("/:id", async (req, res, next) => {
  let id = req.params.id;
  let sql = "SELECT * FROM term WHERE term_id = ?;";
  stdQuery(res, sql, [id]);
});

// POST term
router.post("/", async (req, res, next) => {
  let term = req.body;
  console.log(term);
  let sql = "INSERT INTO term SET ?;";
  stdQueryPost(res, sql, [term], validate(term));
});

// DELETE term with id
router.delete("/:id", async (req, res, next) => {
  let id = req.params.id;
  let sql = "DELETE FROM term WHERE term_id = ?;";
  stdQuery(res, sql, [id]);
});

// PUT term with id
router.put("/:id", async (req, res, next) => {
  let term = req.body;
  console.log(term);
  let sql = "UPDATE term SET ? WHERE term_id  = ?";
  stdQueryPut(res, sql, [term, req.params.id], validate(term));
});

// Validate TERM
function validate(term) {
  let errorMessage = "[";

  errorMessage += "]";
  return errorMessage;
}

module.exports = {
  termRouter: router,
};
