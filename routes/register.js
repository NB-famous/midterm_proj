const express = require('express');
const router = express.Router();

module.exports = (db) => {
  console.log(db);
  router.get('/', (req, res) => {
    res.render('register', {user: req.cookies});
  });

  router.post('/', (req, res) => {

    const {username, email, password} = req.body;

    //Add the user in db
    const queryStr = {
      text:`INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *`,
      values:[username, email, password]
    }; 
    db.query(queryStr)
    .then(result => {
      //res.json(result.rows)
      const user = result.rows;
      res.cookie('userID', user[0].id);
      res.redirect('/')
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
    
  });

  router.post('/', (req, res) => {
    res.redirect('/');
    return db.query(`
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING *
      `, [db.username, db.email, db.password])
      .then(res => res.rows[0])
      .catch(err => null);
  });
  // Why you doing this to me baltej //
  return router;
};



