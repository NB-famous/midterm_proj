const express = require('express');
const router = express.Router();

module.exports = (db) => {
  /* router.get('/', (req, res) => {
    res.render('createQuiz', {user: req.cookies});
  }); */

  router.get("/", (req, res) => {
    db.query(`SELECT * FROM quiz_questions;`)
      .then(data => {
        const quiz_questions = data.rows;
        res.json({ quiz_questions });
        res.render('createQuiz', {user: req.cookies});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post('/', (req, res) => {

    const {question, answer1, answer2, answer3, answer4, result} = req.body;

    //Add the user in db
    const queryStr = {
      text:`INSERT INTO quiz_questions(question, answer1, answer2, answer3, answer4, result) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
      values:[question, answer1, answer2, answer3, answer4, result]
    }; 
    db.query(queryStr)
    .then(results => {
      //res.json(result.rows)
      const user = results.rows;
      res.cookie('questionID', user[0].id);
      res.redirect('/')
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
    
  });

  return router;
};
