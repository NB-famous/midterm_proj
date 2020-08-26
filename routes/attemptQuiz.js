const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    res.render('attemptQuiz', { user: req.user });
  });


  

  return router;
};