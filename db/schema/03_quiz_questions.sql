DROP TABLE IF EXISTS quiz_questions CASCADE;

CREATE TABLE quiz_questions(
    id SERIAL PRIMARY KEY NOT NULL,
    question TEXT,
    quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE
)