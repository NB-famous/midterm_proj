
const getUserById = function (db, id) {
    return db
      .query(`SELECT * FROM users WHERE id = $1;`, [id])
      .then(res => res.rows[0]);
  };

  const getPublicQuizzes = function (db) {
    return db
      .query(`SELECT * FROM quizzes WHERE is_private = false ORDER BY creation_date LIMIT 20;`)
      .then(res => res.rows);
  };

const numberofQuizAttempts = function (db,id) {
  return db
  .query(`SELECT COUNT(*) as numberofAttempts FROM results
  WHERE quiz_id = $1;`, [id])
  .then(res => res.rows)
}

  module.exports = {getUserById, getPublicQuizzes, numberofQuizAttempts};
