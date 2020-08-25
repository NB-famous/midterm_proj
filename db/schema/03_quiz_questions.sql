DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS quiz_questions CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255),
  email VARCHAR(255) ,
  password VARCHAR(255)
);

CREATE TABLE quiz_questions(
    id SERIAL PRIMARY KEY NOT NULL,
    question TEXT,
    answer1 TEXT,
    answer2 TEXT,
    answer3 TEXT,
    answer4 TEXT,
    result INTEGER,
    quiz_id INTEGER REFERENCES users(id) ON DELETE CASCADE
)
