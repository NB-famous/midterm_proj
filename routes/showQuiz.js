// This will create an api page for our quiz_questions table

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    //console.log(`userid, ${JSON.stringify(req.cookies['userID'])}`)
    let user_id = req.cookies['userID'];
    console.log('questionID cookie:', req.cookies['questionID'][0]['quiz_id']);
    console.log('quizID cookie:', req.cookies['quizID']);
    db.query(`SELECT * FROM quiz_questions WHERE owner_id = ${user_id};`) // calling the entire quiz_questions so query the id only.
    // figure out what goes inside ${what goes here ?} instead of 1;
    /* let user_id = JSON.stringify(req.cookies['quizID']['id']);
    console.log(`userid, ${user_id}`)
    db.query(`
    SELECT * FROM quizzes
    JOIN quiz_questions ON quiz_questions.id = quiz_id
    WHERE quizzes.id = ${user_id};`) */
      .then(data => {
        const quiz_questions = data.rows;
        res.cookie('questionID', quiz_questions);
        console.log(JSON.stringify(req.cookies['questionID']));
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
