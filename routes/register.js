const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    res.render('register');
  });

  const User = function (user) {
    console.log(users);
    db.query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *
    , [user.username, user.email, user.password])
    .then(res => res.rows[0])
    .catch(err => null);
  });
  `)
  }


  return router;
};
