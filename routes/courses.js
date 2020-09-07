var express = require('express');
var router = express.Router();
const mysql = require('mysql');

/* Get course by id validated numbers 0-9 */
router.get('/:id([0-9])', function(req, res, next) {
  // res.send('respond with a resource');

  console.log("GET at /courses/" + req.params.id);
  res.send('id: ' + req.params.id);
});

// post course
router.post('/', function(req, res, next) {
  console.log("POST at /courses/");
  console.log(req.body);

  let course = req.body;
  let errorMessage = validate(course);//validate request here
  // if statement to evaluate error message here
  if(errorMessage.length != 1) {

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

  res.end("courses delete");
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

module.exports = router;
