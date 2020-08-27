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


const getQuizByShortUrl = function (data, shortUrl) {
  console.log('short url: ', shortUrl)
  let str = `SELECT short_url, (quiz_questions.*) FROM quizzes JOIN quiz_questions ON quizzes.id = quiz_id WHERE quizzes.short_url LIKE '%${shortUrl}%' GROUP BY quiz_questions.id, quizzes.short_url;`;
  console.log('str', str);
  return data
    .query(str)
    .then(res => res.rows);
};

module.exports = (db) => {
  router.get('/', (req, res) => {


    const userId = loginUserId(req);
    getUserById(db, userId).then(user => {
      getPublicQuizzes(db)
        .then(quizzes => {
          let urlParam = req.originalUrl.slice(0, -1).split('/');
          //console.log("QUIZZESSS", quizzes);
          getQuizByShortUrl(db, urlParam[2])
            .then(shorturl => {
              //console.log('This is short', shorturl)
                res.render('attemptQuiz', {
                  user: user,
                  shorturl:shorturl
                });
              
            })
        })
    });


  });

  return router;
};

/* module.exports = (db) => {
  router.get('/', (req, res) => {
    res.render('attemptQuiz', { user: req.user });
  });

  return router;
}; */
