
const getUserById = function (db, id) {
    return db
      .query(`SELECT * FROM users WHERE id = $1;`, [id])
      .then(res => res.rows[0]);
  };

  module.exports = {getUserById};