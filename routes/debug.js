const express = require("express");
const router = express.Router();
const { db, createDB, deleteDB } = require("../src/database");

// CREATE DATABASE
router.get("/createdb", async (req, res, next) => {
  try {
    createDB();
    res.send("Created Database");
  } catch (error) {
    throw new Error(error);
  }
});

// DELETE DATABASE
router.get("/deletedb", async (req, res, next) => {
  try {
    deleteDB();
    res.send("Deleted Database");
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  debugRouter: router,
};
