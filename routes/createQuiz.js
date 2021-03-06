const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    // create new quiz here in quizzess
    // get id on this quiz
    //req.cookies['quizID'] = new_id;
    res.render('createQuiz', { user: req.user });
  });

  // Helper function for short URL
  function generateRandomString() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  router.post('/', (req, res) => {

    // req.body is the data from the form
    console.log('BEFORE REQ BODY:', req.body);
    // if the checkbox is being sent back (the box is checked)
    // set the value to true (is private)
    if (req.body.checkbox) {
      req.body.checkbox = 'true';
    } else {
      req.body.checkbox = 'false';
    }

    const { question1, q1Answer1, q1Answer2, q1Answer3, q1Answer4, q1Result } = req.body;
    const { question2, q2Answer1, q2Answer2, q2Answer3, q2Answer4, q2Result } = req.body;
    const { question3, q3Answer1, q3Answer2, q3Answer3, q3Answer4, q3Result } = req.body;
    const { question4, q4Answer1, q4Answer2, q4Answer3, q4Answer4, q4Result } = req.body;
    const { checkbox } = req.body;

    const owner_id = req.cookies['userID'];

    //const quiz_id = req.cookies['quizID'];
    //const owner_id = req.cookies;

    const str = `INSERT INTO quizzes (is_private, creation_date, owner_id, short_url) VALUES(${checkbox}, CURRENT_TIMESTAMP, $1, $2) RETURNING *;`
    db.query(str, [owner_id, generateRandomString()]).then(result => {
      const quiz = result.rows[0];
      res.cookie('quizID', quiz);
      const queryStr1 = {
        text: `INSERT INTO quiz_questions(question, answer1, answer2, answer3, answer4, result, owner_id, quiz_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        values: [question1, q1Answer1, q1Answer2, q1Answer3, q1Answer4, q1Result, owner_id, quiz.id]
      };
      const queryStr2 = {
        text: `INSERT INTO quiz_questions(question, answer1, answer2, answer3, answer4, result, owner_id, quiz_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        values: [question2, q2Answer1, q2Answer2, q2Answer3, q2Answer4, q2Result, owner_id, quiz.id]
      };
      const queryStr3 = {
        text: `INSERT INTO quiz_questions(question, answer1, answer2, answer3, answer4, result, owner_id, quiz_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        values: [question3, q3Answer1, q3Answer2, q3Answer3, q3Answer4, q3Result, owner_id, quiz.id]
      };
      const queryStr4 = {
        text: `INSERT INTO quiz_questions(question, answer1, answer2, answer3, answer4, result, owner_id, quiz_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        values: [question4, q4Answer1, q4Answer2, q4Answer3, q4Answer4, q4Result, owner_id, quiz.id]
      };
      Promise.all([db.query(queryStr1), db.query(queryStr2), db.query(queryStr3), db.query(queryStr4)]).then(() => {
        res.redirect('/myQuiz');
      })
    })
  });

  return router;
};
