const express = require('express');

const router = express.Router();

module.exports = (db) => {
  // console.log(db);
  router.get('/', (req, res) => {
    res.render('register');
  });

  router.post('/', (req, res) => {
    // console.log(req.body);
    res.redirect('/');
  });
  return router;
};



