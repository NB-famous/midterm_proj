DROP TABLE IF EXISTS quiz_answers CASCADE;

CREATE TABLE quiz_answers(
    id SERIAL PRIMARY KEY NOT NULL,
    /*Not sure which data type answer should be*/
    answer TEXT,
    result BIT,
    quiz_question_id INTEGER REFERENCES quiz_questions(id) ON DELETE CASCADE
    
)