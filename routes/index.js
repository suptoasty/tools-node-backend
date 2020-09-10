const express = require('express');
const router = express.Router();
const { db } = require('../src/database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = {
  indexRouter: router,
};
