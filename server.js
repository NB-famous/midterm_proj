// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require('cookie-session')
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');

// PG database client/connection setup
const {
  Pool
} = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);

// Id from users db
const { getUserById, getPublicQuizzes, numberofQuizAttempts, getQuizByShortUrl} = require('./db/database');
const { loginUserId } = require('./get_cookie');

db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(cookieParser());

//cookie session
app.use(cookieSession({
  name: 'session',
  keys: ["I am not doing so well"],
}));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const createQuizRoutes = require('./routes/createQuiz');
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');
const registerRoutes = require('./routes/register');
const myQuizRoutes = require('./routes/myQuizzes');
const showQuizRoutes = require('./routes/showQuiz');
const quizListRoutes = require('./routes/quizListApi');
const attemptQuizRoutes = require('./routes/attemptQuiz');



// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
/* app.get("/", (req, res) => {
  res.render("index");
}); */

// THIS NEEDS TO BE ABOVE THE INDEX GET
app.use('/attemptQuiz/:shorturl', attemptQuizRoutes(db));


app.get("/", (req, res) => {
  //res.render('index', {user: req.cookies})
  const userId = loginUserId(req);
  getUserById(db, userId).then(user => {
    getPublicQuizzes(db)
      .then(quizzes => {
        let urlParam = req.originalUrl.slice(0, -1).split('/');
        console.log("QUIZZESSS", quizzes);
        getQuizByShortUrl(db, urlParam[2])
        .then(shorturl => {
          console.log(`shour :${shorturl}`)
          numberofQuizAttempts(db, quizzes.id)
          .then(number => {
            console.log("NUMBER OF ATTEMPTS", number);
            if (!user) {
              console.log(`not logged quizzes: ${JSON.stringify(quizzes)}`)
              res.render('index', {
                user: {},
                quizzes: quizzes,
                shorturl:shorturl,
                number: number[0].numberofattempts
              });
            } else {
              console.log(`logged quizzes: ${JSON.stringify(quizzes)}`)
              res.render('index', {
                user: user,
                quizzes: quizzes,
                shorturl:shorturl,
                number: number[0].numberofattempts
              });
            }
          });

        });
        
      });
  });
});


// LOGIN //
app.use('/login', loginRoutes(db));
app.use('/register', registerRoutes(db));
app.use((req, res, next) => {
  const userId = loginUserId(req);
  getUserById(db, userId).then(user => {
    if (!user) {
      res.redirect('/');
    } else {
      req.user = user;
      next()
    }
  });
})

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/showQuiz", showQuizRoutes(db));
app.use("/api/quizListApi", showQuizRoutes(db));
app.use('/createQuiz', createQuizRoutes(db));
app.use('/myQuiz', myQuizRoutes(db));

app.use('/logout', logoutRoutes()); // no need for data base since we are deleting just the cookies not db itself

// Note: mount other resources here, using the same pattern above

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
