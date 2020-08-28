// This will create an api page for our quiz_questions table

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


module.exports = (db) => {
  router.get("/:id", (req, res) => {
    const userId = loginUserId(req);
    getUserById(db, userId).then(user => {
      db.query("SELECT * FROM results where id = $1", [req.params.id]).then(data => {
        const result = data.rows[0]
        let msg = '';
        switch (result.score) {
          case 0:
            msg = 'WTF?'
            break;
          case 1:
            msg = 'Reality is often dissapointing...'
            break;
          case 2:
            msg = 'Good Effort!'
            break;
          case 4:
            msg = "AMAZING JOB!"
        }


        res.render('result_show', { user: user ? user : '', result, msg });
      })

    })

  });
  return router;
};
