// This will create an api page for our quiz_questions table

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM quiz_questions;`) // calling the entire quiz_questions so query the id only.
      .then(data => {
        const quiz_questions = data.rows;
        res.json({
          quiz_questions
        });
        //res.render('createQuiz', {user: req.user});
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });
      });
  });
  return router;
};
