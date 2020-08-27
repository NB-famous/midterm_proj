const express = require('express');
const router = express.Router();

function loginUserId(req) {
  return req.cookies.userID;
};

const getUserById = function (data, id) {
  return data
    .query(`SELECT * FROM users WHERE id = $1;`, [id])
    .then(res => res.rows[0]);
};

const getPublicQuizzes = function (data) {
  return data
    .query(`SELECT * FROM quizzes WHERE is_private = true ORDER BY creation_date LIMIT 20;`)
    .then(res => res.rows);
};

const numberofQuizAttempts = function (data,id) {
  return data
  .query(`SELECT COUNT(*) as numberofAttempts FROM results
  WHERE quiz_id = $1;`, [id])
  .then(res => res.rows)
}


module.exports = (db) => {
  router.get('/', (req, res) => {

  const userId = loginUserId(req);
  getUserById(db, userId).then(user => {
    getPublicQuizzes(db)
      .then(quizzes => {
        console.log("QUIZZESSS", quizzes);
        numberofQuizAttempts(db, quizzes.id)
          .then(number => {
            console.log("NUMBER OF ATTEMPTS", number);
            if (quizzes.is_private === true) {
              res.render('myQuiz', {
                user: {},
                quizzes: quizzes,
                number: number[0].numberofattempts
              });
            } else {
              res.render('myQuiz', {
                user: user,
                quizzes: quizzes,
                number: number[0].numberofattempts
              });
            }
          })
      })
  });

  });

  return router;
};