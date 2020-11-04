const express = require("express");
const router = express.Router();
const { db, stdQuery, stdQueryPut, stdQueryPost } = require("../src/database");

// GET all courseplans
router.get("/", async (req, res, next) => {
  let sql = "SELECT * FROM course_plan;";
  stdQuery(res, sql, []);
});

// GET courseplans by student_id
router.get("/student/:id", async (req, res, next) => {
  let id = req.params.id;
  
  let sql = "SELECT * FROM course_plan WHERE course_plan_student = ?;";
  stdQuery(res, sql, [id]);
});

// GET courseplan by course_plan_id
router.get("/:id", async (req, res, next) => {
  let id = req.params.id;
  
  let sql = "SELECT * FROM course_plan WHERE course_plan_id = ?;";
  stdQuery(res, sql, [id]);
});

// POST courseplan
router.post("/", async (req, res, next) => {
  let course_plan = req.body;
  console.log(course_plan);
  
  let sql = "INSERT INTO course_plan SET ?;";
  stdQueryPost(res, sql, [course_plan], validate_plan(course_plan));
});

// DELETE courseplan with id
router.delete("/:id", async (req, res, next) => {
  let id = req.params.id;
  
  let sql = "DELETE FROM course_plan WHERE course_id = ?;";
  stdQuery(res, sql, [id]);
});

// PUT courseplan with id
router.put("/:id", async (req, res, next) => {
  let course_plan = req.body;
  console.log(course_plan);
  
  let sql = "UPDATE course_plan SET ? WHERE course_plan_id = ?";
  stdQueryPut(res, sql, [course_plan, req.params.id], validate_plan(course_plan));
});

// Course plan items
// GET all course plan items for a course plan
router.get("/:id/items", async (req, res, next) => {
  let id = req.params.id;
  
  let sql = "SELECT * FROM course_plan_item WHERE course_plan_item_plan = ?;";
  stdQuery(res, sql, [id]);
});

// GET specific course plan item
router.get("/:id/items/:item_id", async (req, res, next) => {
  let item_id = req.params.item_id;
  
  let sql = "SELECT * FROM course_plan_item WHERE course_plan_item_id = ?;";
  stdQuery(res, sql, [item_id]);
});

// PUT course plan item
router.put("/:id/items/:item_id", async (req, res, next) => {
  let cp_item = req.body;
  cp_item.course_plan_item_plan = req.params.id;
  cp_item.course_plan_item_id = req.params.item_id;
  console.log(cp_item);
  
  let sql = "UPDATE course_plan_item SET ? WHERE course_plan_item_id = ?";
  stdQueryPut(res, sql, [cp_item, req.params.item_id], validate_item(cp_item));
});

// POST course plan item
router.post("/:id/items", async (req, res, next) => {
  let cp_item = req.body;
  cp_item.course_plan_item_id = undefined;
  console.log(cp_item);
  
  let sql = "INSERT INTO course_plan_item SET ?;";
  stdQueryPost(res, sql, [cp_item], validate_item(cp_item));
});

// DELETE course plan item
router.delete("/:id/items/:item_id", async (req, res, next) => {
  let id = req.params.item_id;
  
  let sql = "DELETE FROM course_plan_item WHERE course_plan_item_id = ?;";
  stdQuery(res, sql, [id]);
});

// Validate COURSE_PLAN
function validate_plan(course) {
  var errorMessage = "[";

  //if(course.course_attribute != undefined) {
  //    errorMessage += '{"attributeName":"course_attribute" , "message":"Must have attribute"}';

  errorMessage += "]";
  return errorMessage;
}

// Validate COURSE_PLAN_ITEM
function validate_item(cp_item) {
  var errorMessage = "[";

  errorMessage += "]";
  return errorMessage;
}

module.exports = {
  coursePlanRouter: router,
};
