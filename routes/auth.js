const express = require("express");
const router = express.Router();
const { db } = require("../src/database");
const config = require("../config/config");

router.post("/login", (req, res, next) => {
  //verify req
  //verify user with gauth-library
  //find user
  //create new token for our database
  //create session

  res.json(req.body);
});

router.post("/logout", (req, res, next) => {
  //delete session
  //delete token from database
  res.json(req.body);
});

module.exports = {
  authRouter: router,
};
