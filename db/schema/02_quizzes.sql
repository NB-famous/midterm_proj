DROP TABLE IF EXISTS quizzes CASCADE;

CREATE TABLE quizzes(

    id SERIAL PRIMARY KEY NOT NULL,
    /*NEED MORE INFO FOR BOOLEAN*/
    is_public BIT,
    creation_date DATE,
    owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE
)
