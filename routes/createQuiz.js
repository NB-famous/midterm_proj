const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    res.render('createQuiz', { user: req.user });
  });


  router.post('/', (req, res) => {

    const { question, answer1, answer2, answer3, answer4, result } = req.body;

    //Add the user in db
    const queryStr = {
      text: `INSERT INTO quiz_questions(question, answer1, answer2, answer3, answer4, result) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
      values: [question, answer1, answer2, answer3, answer4, result]
    };
    db.query(queryStr)
      .then(results => {
        // res.json(result.rows)
        const user = results.rows;
        // console.log(user);
        res.cookie('resultID', user);
        res.redirect('/createQuiz')
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });

  });

  return router;
};
