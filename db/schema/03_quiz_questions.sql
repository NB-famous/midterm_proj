DROP TABLE IF EXISTS quiz_questions CASCADE;

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
