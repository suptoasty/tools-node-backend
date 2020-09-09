var express = require('express');
var router = express.Router();
const { db, createDB, deleteDB, dbPool } = require('../src/database');


router.get('/', function(req, res, next) {
  res.send('Can not Access courses directly');
});

/* Get course by id validated numbers 0-9 */
router.get('/:id', async function(req, res, next) {
  // res.send('respond with a resource');

  let id = req.params.id;
  let table = 'courseList'; //change to actual table for production
  let sql = 'SELECT * FROM '+ table +';';

  try {
    dbPool.query('SELECT * FROM courseslist WHERE course_id = '+ id +";", [], (err, result, fields) => {
      if(err) throw err;
      Object.keys(result).forEach((key) => {
        console.log(result[key]);
      });
    });
  } catch (error) {
    console.log(error);
  }
  console.log("GET at /courses/" + id);
  res.send('id: ' + id);
});

// post course
router.post('/', function(req, res, next) {
  console.log("POST at /courses/");
  console.log(req.body);

  let course = req.body;
  let errorMessage = validate(course);//validate request here
  // if statement to evaluate error message here
  if(errorMessage.length != 1) {
    let sql = 'INSERT INTO test SET ?;';
    //create query code here
  } else {
    //post logic here
    res.send("courses post");
  }

});

// delete course with id
router.delete('/:id', function(req, res, next) {
  console.log("DELETE at /courses/" + req.params.id);
  let id = req.params.id;
  // validation and delete logic here

  console.log(result);  
  res.end("course deleted");
});

// update course with id
router.put('/:id', function(req, res, next) {
  console.log("PUT at /courses/" + req.params.id);
  res.end("courses put");
});


// validate request here...returns error message
function validate(course) {
  let errorMessage = "Courses Error: ";

  // validations here using attributes from courses request

  return errorMessage;
}

module.exports = {
  coursesRouter: router,
};
