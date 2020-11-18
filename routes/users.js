const express = require("express");
const router = express.Router();
const { db, stdQuery, stdQueryPut, stdQueryPost } = require("../src/database");

// GET user by id
router.get("/:id", async (req, res, next) => {
  let id = req.params.id;
  let sql = "SELECT * FROM user WHERE user_id = ?;";
  stdQuery(res, sql, [id]);
});

// POST user
router.post("/", async (req, res, next) => {
  let user = req.body;
  console.log(user);
  let sql = "INSERT INTO user SET ?;";
  stdQueryPost(res, sql, [user], validate(user));
});

// DELETE user with id
router.delete("/:id", async (req, res, next) => {
  let id = req.params.id;
  let sql = "DELETE FROM user WHERE user_id = ?;";
  stdQuery(res, sql, [id]);
});

// PUT user with id
router.put("/:id", async (req, res, next) => {
  let user = req.body;
  console.log(user);
  let sql = "UPDATE user SET ? WHERE user_id = ?";
  stdQueryPut(res, sql, [user, req.params.id], validate(user));
});

// validate USER
function validate(user) {
  var errorMessage = "[";

  // TODO: Append JSON instead of just a string
  if (user.user_name === "") {
    errorMessage += "User Name must not be empty.";
  }
  if (user.user_email === "") {
    errorMessage += "User Email must not be empty.";
  }
  if (user.user_password === "") {
    errorMessage += "User Password must not be empty.";
  }

  //if(advisor.advisor_attribute != undefined) {
  //    errorMessage += '{"attributeName":"advisor_attribute" , "message":"Must have attribute"}';

  errorMessage += "]";
  return errorMessage;
}

module.exports = {
  usersRouter: router,
};
