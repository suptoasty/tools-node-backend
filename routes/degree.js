const express = require("express");
const router = express.Router();
const { db, stdQuery, stdQueryPut, stdQueryPost } = require("../src/database");

// GET all degrees
router.get("/", function (req, res, next) {
  let sql = "SELECT * FROM degree;";
  stdQuery(res, sql, []);
});

// GET degree by id
router.get("/:id", async (req, res, next) => {
  let id = req.params.id;
  let sql = "SELECT * FROM degree WHERE degree_id = ?;";
  stdQuery(res, sql, [id]);
});

// POST degree
router.post("/", async (req, res, next) => {
  let degree = req.body;
  degree.degree_id = undefined;
  console.log(degree);
  
  let sql = "INSERT INTO degree SET ?;";
  stdQueryPost(res, sql, [degree], validateDegree(degree));
});

// DELETE degree with id
router.delete("/:id", async (req, res, next) => {
  let id = req.params.id;
  let sql = "DELETE FROM degree WHERE degree_id = ?;";
  stdQuery(res, sql, [id]);
});

// PUT degree with id
router.put("/:id", async (req, res, next) => {
  let degree = req.body;
  degree.degree_id = req.params.id;
  console.log(degree);

  let sql = "UPDATE degree SET ? WHERE degree_id = ?";
  stdQueryPut(res, sql, [degree, req.params.id], validateDegree(degree));
});

// Degree_Plan
// GET all degree_plan items for a degree
router.get("/:id/items", async (req, res, next) => {
  let sql = "SELECT * FROM degree_plan WHERE degree_plan_degree = ?;";
  stdQuery(res, sql, [req.params.id]);
});

// GET specific degree_plan item
router.get("/:id/items/:item_id", async (req, res, next) => {
  let sql = "SELECT * FROM degree_plan WHERE degree_plan_id = ?;";
  stdQuery(res, sql, [req.params.id]);
});

// PUT degree_plan item
router.put("/:id/items/:item_id", async (req, res, next) => {
  let degreePlan = req.body;
  degreePlan.degree_plan_id = req.params.item_id;
  console.log(degreePlan);

  let sql = "UPDATE degree_plan SET ? WHERE degree_plan_id = ?";
  stdQueryPut(res, sql, [degreePlan, req.params.id], validateDegreePlan(degreePlan));
});

// POST degree_plan item
router.post("/:id/items", async (req, res, next) => {
  let degreePlan = req.body;
  degreePlan.degree_plan_id = undefined;
  degreePlan.degree_plan_degree = req.params.id;
  console.log(degreePlan);

  let sql = "INSERT INTO degree_plan SET ?;";
  stdQueryPost(res, sql, [degreePlan], validateDegreePlan(degreePlan));
});

// DELETE degree_plan item
router.delete("/:id/items/:degree_plan_id", async (req, res, next) => {
  let sql = "DELETE FROM degree_plan WHERE degree_plan_id = ?;";
  stdQuery(res, sql, [req.params.degree_plan_id]);
});

// Validate DEGREE
function validateDegree(degree) {
  var errorMessage = "[";

  //if(degree.degree_attribute != undefined) {
  //    errorMessage += '{"attributeName":"degree_attribute" , "message":"Must have attribute"}';

  errorMessage += "]";
  return errorMessage;
}

// Validate DEGREE_PLAN
function validateDegreePlan(degreePlan) {
  var errorMessage = "[";

  errorMessage += "]";
  return errorMessage;
}

module.exports = {
  degreeRouter: router,
};
