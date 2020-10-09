const express = require("express");
const router = express.Router();
const { db } = require("../src/database");
const config = require("../config/config");

router.post("/login", (req, res, next) => {
  res.json(req.body);
});

router.post("/logout", (req, res, next) => {
  res.json(req.body);
});

module.exports = {
  authRouter: router,
};
