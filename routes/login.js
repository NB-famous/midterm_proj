const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    res.render('login', { user: req.cookies });
  });


  router.post('/', (req, res) => {
    const { email, password } = req.body;
    const values = [email, password];
    const queryStr = `
      SELECT * FROM users
      WHERE email = $1
      AND password = $2
    `;
    db.query(queryStr, values)
      .then(data => {
        const user = data.rows;
        res.cookie('userID', user[0].id);
        res.redirect('/');
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });




  return router;
};

