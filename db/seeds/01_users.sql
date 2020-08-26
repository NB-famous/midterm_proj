-- Users table seeds here (Example)
INSERT INTO users (id,username, email, password)
VALUES (1,'Alice', 'a@a.ca', 'password'),
(2,'Kira', 'b@b.ca', 'password'),
(3,'jonny', 'c@c.ca', 'password');

INSERT INTO quizzes(owner_id, is_private, creation_date, short_url)
VALUES (1, false, current_timestamp, 'f4rfrfr4'),
(2, false, current_timestamp, 'f4rfdwqs'),
(3, false, current_timestamp, 'f1adfhjs')
