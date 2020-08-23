const express = require('express');
const router = express.Router();

module.exports = (db) => {
  console.log(db);
  router.get('/', (req, res) => {
    res.render('register');
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



