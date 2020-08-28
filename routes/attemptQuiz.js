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
  router.get('/:id', (req, res) => {
    const userId = loginUserId(req);
    getUserById(db, userId).then(user => {
      console.log('this is user', user)
      getPublicQuizzes(db)
        .then(quizzes => {
          // let urlParam = req.originalUrl.slice(0, -1).split('/');
          //console.log("QUIZZESSS", quizzes);
          getQuizByShortUrl(db, req.params.id)
            .then(quizzes => {
              //console.log('This is short', shorturl)
              res.render('attemptQuiz', {
                user: user ? user : '',
                quizzes,
                shorturl: req.params.id
              });

            })
        })
    });
  });

  router.post('/:id', (req, res) => {
    console.log(req.body);
    // INSERT INTO widgets (name, user_id) VALUES ('Sprockets', 1);
    db.query(
      "INSERT INTO results (score, date_attempted, quiz_id, owner_id) VALUES ($1, CURRENT_TIMESTAMP, $2, $3) RETURNING *;",
      [req.body.score, req.body.quizId, req.body.ownerId])
      .then(result => {
        console.log(result.rows);
        res.json({ resultId: result.rows[0].id });
      })
  })

  return router;
};

/* module.exports = (db) => {
  router.get('/', (req, res) => {
    res.render('attemptQuiz', { user: req.user });
  });

  return router;
}; */
