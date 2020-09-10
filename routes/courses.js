var express = require('express');
var router = express.Router();
const { db } = require('../src/database');

// TODO: GET all courses
router.get('/', function(req, res, next) {
  res.send('Can not Access courses directly use id');
});


// TODO: GET courses by page


// GET course by id
router.get('/:id', async (req, res, next) => {
  let id = req.params.id;
  let sql = 'SELECT * FROM courseslist WHERE course_id = ?;';

  try {
    db.query(sql, [id], function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  } 
  catch (error) {
    console.log(error);
    res.send(error);
  }

});


// POST course
router.post('/', async (req, res, next) => {
  let course = req.body;
  console.log(course);

  let errorMessage = validate(course); //validate request here
  if(errorMessage.length != 1) {
    let sql = 'INSERT INTO courses.courseslist SET ?;';
    //create query code here
    try {
      db.query(sql, [course], function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.json({ id: result.insertId });
        }
      });
    } 
    catch (error) {
      console.log(error);
      res.send(error);
    }

  } else {
    res.send("Post Failed");
  }

});


// DELETE course with id
router.delete('/:id', async function(req, res, next) {
  console.log("DELETE at /courses/" + req.params.id);
  let id = req.params.id;
  let sql = 'DELETE FROM courses.courseslist WHERE course_id = ?;';

  try {
    db.query(sql, [id], function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json({ id: result.insertId});
      }
    });
  } 
  catch (error) {
    console.log(error);
    res.send(error);
  }

  console.log(result);  
  res.end("course deleted");
});


// PUT course with id
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
