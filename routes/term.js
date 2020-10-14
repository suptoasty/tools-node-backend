// GET all terms
router.get("/", function (req, res, next) {
    let sql = "SELECT * FROM term;";
  
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
  
  
  
  // GET term by id
  router.get('/:id', async (req, res, next) => {
    let id = req.params.id;
    let sql = 'SELECT * FROM term WHERE term_id = ?;';
  
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
  
  
  
  // POST term
  router.post('/', async (req, res, next) => {
    let term = req.body;
    console.log(term);
  
    let errorMessage = validate(term); //validate request here
    if (errorMessage.length > 2) {
      res.status(406);
      res.send(errorMessage);
    } else {
      let sql = 'INSERT INTO term SET ?;';
      
      try {
        db.query(sql, [term], function(err, result) {
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
  
  
  // DELETE student with id
  router.delete('/:id', async (req, res, next) => {
    console.log("DELETE at /term/" + req.params.id);
    let id = req.params.id;
    let sql = 'DELETE FROM term WHERE term_id = ?;';
  
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
  
  
  // PUT student with id
  router.put('/:id', async (req, res, next) => {
    let term = req.body;
    console.log(term);
  
    let errorMessage = validate(term); //validate request here
    if (errorMessage.length > 2) {
      res.status(406);
      res.send(errorMessage);
    } else {
      let sql = 'UPDATE term SET ? WHERE term_id  = ?';
      
      try {
        db.query(sql, [term, req.params.id], function(err, result) {
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
  function validate(term) {
    let errorMessage = "[";
  
    errorMessage += "]";
    return errorMessage;
  }
  
  module.exports = {
    termRouter: router,
  };