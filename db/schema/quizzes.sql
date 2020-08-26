DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS quizzes CASCADE;
DROP TABLE IF EXISTS quiz_questions CASCADE;
DROP TABLE IF EXISTS quiz_answers CASCADE;
DROP TABLE IF EXISTS results CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE quizzes(
    id SERIAL PRIMARY KEY NOT NULL,
    is_private BOOLEAN DEFAULT FALSE,
    creation_date DATE,
    owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE quiz_questions(
    id SERIAL PRIMARY KEY NOT NULL,
    question TEXT,
    answer1 TEXT,
    answer2 TEXT,
    answer3 TEXT,
    answer4 TEXT,
    result INTEGER,
    owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE
);

CREATE TABLE quiz_answers(
    id SERIAL PRIMARY KEY NOT NULL,
    /*Not sure which data type answer should be*/
    result INTEGER,
    quiz_question_id INTEGER REFERENCES quiz_questions(id) ON DELETE CASCADE
);

CREATE TABLE results(
    id SERIAL PRIMARY KEY NOT NULL,
    score INTEGER NOT NULL DEFAULT 0,
    date_attempted DATE,
    quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
    owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

