
const getUserById = function (db, id) {
    return db
      .query(`SELECT * FROM users WHERE id = $1;`, [id])
      .then(res => res.rows[0]);
  };

  const getPublicQuizzes = function (db) {
    return db
      .query(`SELECT * FROM quizzes WHERE is_public = true ORDER BY creation_date LIMIT 20;`)
      .then(res => res.rows);
  };

const numberofQuizAttempts = function (db,id) {
  return db
  .query(`SELECT COUNT(*) FROM results
  WHERE quiz_id = $1;`, [id])
  .then(res => console.log("TGHIS IS RES", res))
}
  module.exports = {getUserById, getPublicQuizzes};
