const { request } = require("express");
const express = require("express");
const router = express.Router();
const { db } = require("../src/database");
const config = require("../config/config");




// GET all semesters
router.get("/", async (req, res, next) => {
  let sql = "SELECT * FROM semester JOIN term ON (term.term_id = semester.semester_term);";

  try {
    db.query(sql, [], function (err, result) {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send(error);
  }
});



// GET semester by id
router.get('/:id', async (req, res, next) => {
  let id = req.params.id;
  let sql = 'SELECT * FROM semester JOIN term ON (term.term_id = semester.semester_term) WHERE semester_id = ?;';

  try {
    db.query(sql, [id], function(err, result) {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        res.json(result);
      }
    });
  } 
  catch (error) {
    console.log(error);
    res.status(500);
    res.send(error);
  }

});



// POST semester
router.post('/', async (req, res, next) => {
  let semester = req.body;
  semester.semester_id = undefined
  console.log(semester);

  let errorMessage = validate(semester); //validate request here
  if (errorMessage.length > 2) {
    res.status(406);
    res.send(errorMessage);
  } else {
    let sql = 'INSERT INTO semester SET ?;';
    
    try {
      db.query(sql, [semester], function(err, result) {
        if (err) {
          res.status(500);
          res.send(err);
        } else {
          res.json({ id: result.insertId });
        }
      });
    } 
    catch (error) {
      console.log(error);
      res.status(500);
      res.send(error);
    }
  }
});


// DELETE semester
router.delete('/:id', async (req, res, next) => {
  let id = req.params.id;
  let sql = 'DELETE FROM semester WHERE semester_id = ?;';

  try {
    db.query(sql, [id], function(err, result) {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        res.json(result);
      }
    });
  } 
  catch (error) {
    console.log(error);
    res.status(500);
    res.send(error);
  }
});


// PUT semester with id
router.put('/:id', async (req, res, next) => {
  let semester = req.body;
  semester.semester_id = req.params.id
  console.log(semester);

  let errorMessage = validate(semester); //validate request here
  if (errorMessage.length > 2) {
    res.status(406);
    res.send(errorMessage);
  } else {
    let sql = 'UPDATE semester SET ? WHERE semester_id = ?';
    
    try {
      db.query(sql, [semester, req.params.id], function(err, result) {
        if (err) {
          res.status(500);
          res.send(err);
        } else {
          res.json(result);
        }
      });
    } 
    catch (error) {
      console.log(error);
      res.status(500);
      res.send(error);
    }
  }
});



// validate request here...returns error message
function validate(student) {
  let errorMessage = "[";

  errorMessage += "]";
  return errorMessage;
}

module.exports = {
  semesterRouter: router,
};
