const express = require('express');
const router = express.Router();
const { db } = require('../src/database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// log a user in
router.post('/login', function(req, res, next) {
  // change to allow for session token in database
  // ensure password is immediatly encrypted
  
  let userName = req.body.userName;
  let userPassword = req.body.userPassword;
  
  /* 
    will need to change to await on server response
    then return error code or success
  */
  if(userName && userPassword) {
    // SQL and further validation here

    res.send('End of login');
    res.end();
  } else {

    res.send("Please enter Usernam and Password");
    res.end();
  }

});

// log current user out
router.post('/logout', function(req, res, next) {
  res.end('post at logout');
});

// create a new user
router.post('/', function(req, res, next) {
  res.end('post at users');
});

module.exports = {
  usersRouter: router,
};
