const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    res.render('register');
  });

  router.post('/', (req, res) => {
    const {user, email, password} = req.body;
    const val = [user, email, password];
    const queryStr =` 
      INSERT INTO users (username, email, password)
      VALUES ($1,$2,$3)
      RETURNING *
    `;

    db.query(queryStr, val)
    .then(input => {
      const obj = input.rows[0];
      res.json({obj});
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
    
  });

  return router;
};
