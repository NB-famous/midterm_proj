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

const getMyQuizzes = function (data) {
  return data
    .query(`SELECT * FROM quizzes ORDER BY creation_date LIMIT 20;`)
    .then(res => res.rows);
};

const numberofQuizAttempts = function (data, id) {
  return data
    .query(`SELECT COUNT(*) as numberofAttempts FROM results
  WHERE quiz_id = $1;`, [id])
    .then(res => res.rows)
}


module.exports = (db) => {
  router.get('/', (req, res) => {

    const userId = loginUserId(req);
    getUserById(db, userId).then(user => {
      getMyQuizzes(db)
        .then(quizzes => {
          numberofQuizAttempts(db, quizzes.id)
            .then(number => {
              // if someone is logged in it will show the user's quizzes
              if (req.cookies.userID) {
                let myQuizzes = quizzes.filter(quiz => quiz.owner_id == req.cookies.userID);
                res.render('myQuiz', {
                  user: user ? user : '',
                  quizzes: myQuizzes,
                  number: number[0].numberofattempts
                });
              } else {
                let publicQuizzes = quizzes.filter(quiz => quiz.is_private === false);
                res.render('myQuiz', {
                  user: user ? user : '',
                  quizzes: publicQuizzes,
                  number: number[0].numberofattempts
                });
              }
            })
        })
    });

  });

  return router;
};
