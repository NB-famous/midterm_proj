// Create query to find all data in users table based on the id of the user
const getUserById = function (db, id) {
    return db
      .query(`SELECT * FROM users WHERE id = $1;`, [id])
      .then(res => res.rows[0]);
  };
// Create query to find all of the public quizzes
  const getPublicQuizzes = function (db) {
    return db
      .query(`SELECT * FROM quizzes WHERE is_private = false ORDER BY creation_date LIMIT 20;`)
      .then(res => res.rows);
  };
// Create query to find the amount of times the quiz has been attempted
const numberofQuizAttempts = function (db,id) {
  return db
  .query(`SELECT COUNT(*) as numberofAttempts FROM results
  WHERE quiz_id = $1;`, [id])
  .then(res => res.rows)
}
// Create query to find short URL
const getQuizByShortUrl = function (data, shortUrl) {
  console.log('short url: ', shortUrl)
  let str = `SELECT short_url, (quiz_questions.*) FROM quizzes JOIN quiz_questions ON quizzes.id = quiz_id WHERE quizzes.short_url LIKE '%${shortUrl}%' GROUP BY quiz_questions.id, quizzes.short_url;`;
  console.log('str', str);
  return data
    .query(str)
    .then(res => res.rows);
};


  module.exports = {getUserById, getPublicQuizzes, numberofQuizAttempts, getQuizByShortUrl};
