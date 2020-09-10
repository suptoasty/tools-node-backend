const express = require('express');
const router = express.Router();
const { db } = require('../src/database');
const mysql = require('mysql');

router.get('/', function(req, res, next) {
  res.send('Can not Access courses directly use id');
});

/* Get course by id validated numbers 0-9 */
router.get('/:id', async (req, res, next) => {
  let id = req.params.id;
  let sql = 'SELECT * FROM courseslist WHERE course_id = ?;';

  try {
    let query = await db.query(sql, [id]);
    query.on('result', (row, index) => {
      res.json(row); //send back the row as a json file
    });

  } catch (error) {
    console.log(error);
  }

});

// post course
router.post('/', async (req, res, next) => {

  let course = req.body;
  console.log(course);
  let errorMessage = validate(course);//validate request here

  // if statement to evaluate error message here
  if(errorMessage.length != 1) {
    let sql = 'INSERT INTO courses.coursesList SET ?;';
    //create query code here
    try {
      let query = await db.query(sql, [course]);
      query.on('error', (err) => {
        res.send(err);
        throw new Error(err);
      });
      query.on('result', (row, index) => {
        res.json({ id: row.insertId});
      });
      
    } catch (error) {
      res.send(error);
      throw new Error(error);
    }

  } else {
    res.send("Post Failed");
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
