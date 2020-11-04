const express = require("express");
const router = express.Router();
const { db, stdQuery, stdQueryPut, stdQueryPost } = require("../src/database");

// TODO: GET all advisors
router.get("/", async (req, res, next) => {
  let sql = "SELECT * FROM advisor;";
  stdQuery(res, sql, []);
});

// GET advisor by id
router.get("/:id", async (req, res, next) => {
  let id = req.params.id;
  let sql = `SELECT * FROM user RIGHT JOIN advisor ON user.user_advisor=advisor.advisor_id WHERE advisor_id = ?;`;
  stdQuery(res, sql, [id]);
});

// POST advisor
router.post("/", async (req, res, next) => {
  let advisor = req.body;
  console.log(advisor);
  let sql = "INSERT INTO advisor SET ?;";
  stdQueryPost(res, sql, [advisor], validate(advisor));
});

// DELETE advisor with id
router.delete("/:id", async (req, res, next) => {
  let id = req.params.id;
  let sql = "DELETE FROM advisor WHERE advisor_id = ?;";
  stdQuery(res, sql, [id]);
});

// PUT advisor with id
router.put("/:id", async (req, res, next) => {
  let advisor = req.body;
  console.log(advisor);
  let sql = "UPDATE advisor SET ? WHERE advisor_id = ?";
  stdQueryPut(res, sql, [advisor, req.params.id], validate(advisor));
});

// Validate ADVISOR
function validate(advisor) {
  var errorMessage = "[";

  //if(advisor.advisor_attribute != undefined) {
  //    errorMessage += '{"attributeName":"advisor_attribute" , "message":"Must have attribute"}';

  errorMessage += "]";
  return errorMessage;
}

module.exports = {
  advisorRouter: router,
};
