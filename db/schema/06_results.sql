CREATE TABLE results(
    id SERIAL PRIMARY KEY NOT NULL,
    score INTEGER,
    date_attempted DATE,
    quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
)