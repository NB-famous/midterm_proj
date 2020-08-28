-- Users table seeds here (Example)
INSERT INTO users (id,username, email, password)
VALUES (1,'Alice', 'a@a.ca', 'password'),
(2,'Kira', 'b@b.ca', 'password'),
(3,'jonny', 'c@c.ca', 'password');

INSERT INTO quizzes(owner_id, is_private, creation_date, short_url)
VALUES (1, false, current_timestamp, 'f4rfrfr4'),
(2, false, current_timestamp, 'f4rfdwqs'),
(3, false, current_timestamp, 'f1adfhjs');


INSERT INTO quiz_attempt(user_id, quiz_id, question_id, user_response)
VALUES (1, 1, 1, 1),
(2, 1, 2, 2),
(3, 1, 3, 3);


INSERT INTO quiz_result(quiz_attempt_id, date_attempted, score)
VALUES (1, current_timestamp, 2),
(2, current_timestamp, 1),
(3, current_timestamp, 4);