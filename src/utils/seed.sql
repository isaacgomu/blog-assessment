CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    username VARCHAR(15),
    title VARCHAR(255),
    content TEXT
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category TEXT
)

CREATE TABLE comment (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id),
    username VARCHAR(15),
    content TEXT
)

CREATE TABLE posts_categories(
post_id INTEGER REFERENCES posts(id),
category_id INTEGER REFERENCES categories(id),
PRIMARY KEY (post_id, category_id)
);

INSERT INTO posts (username, title, content)
VALUES ('isaacgomu', 'my first post', 'hello everyone! this is my website')

INSERT INTO posts (username, title, content)
VALUES ('isaacgomu', 'What is everyone''s favourite video game?', 'My favourite video games are Soulslikes (DS3, Elden Ring and Sekiro are my favourites but recently Another Crab''s Treasure was really good), Hollow Knight, RPGs like the Elder Scrolls, Sea of Thieves, Terraria, GTA V but my absolute favourite game is Outer Wilds.')

INSERT INTO posts (username, title, content)
VALUES ('royalgutz', 'who is the best one piece character and why it''s gaimon', 'it''s because he lives in a chest and befriended buggy, chill as hell.')

INSERT INTO posts (username, title, content)
VALUES
('fishfan38', 'yo i love fish', 'shoutout pufferfish 🐡')

INSERT INTO posts (username, title, content)
VALUES
('fishfan38', 'why did my first post not show up?', 'hate this damn site man')

INSERT INTO posts (username, title, content)
VALUES
('fishfan38', 'Dear Developers', 'I would like to apologise for stating that I hate this site. I do not in fact. I was annoyed that my post had not shown up but with due diligence in blinding speed you fixed my issue. Thank you developers. I love you 💋💋💋')

INSERT INTO posts (username, title, content)
VALUES ('isaacgomu', 'on issues with website', 'hello everyone! this is the developer here. If you have an issue with the website please do not hesitate to message me or make a post about it like our good friend fishfan38 did, but please do not direct any hatred towards me, i am trying my best')

INSERT INTO posts (username, title, content)
VALUES ('isaacgomu', 'something very strange...', 'hello everyone! there is something very strange occuring with this website. Upon attempting to add a post, the console.log and the website won''t show it for a while. After me frantically trying to bug fix, it occasionally will just work for no apparent reason. I cannot figure it out!!! GRAHHHHH')

INSERT INTO posts (username, title, content)
VALUES ('henkomulan', 'Why is my friend Henko Mulan so awesome', 'he loves Shanghai and lemon pepper wings')

INSERT INTO posts (username, title, content)
VALUES ('isaacgomu', 'fixed the issue!', 'hello everyone! my issue was that i was not revalidating the path! how silly of me. it is fixed!')

INSERT INTO categories (category) VALUES
('Community')
('Education')
('Humour')
('Hatred')
('Joyous')
('Technology')
('Video Games')
('Music')
('Anime & Manga')
('TV & Film')
('Books')
('Spoilers')

INSERT INTO posts_categories (post_id, category_id)
VALUES (1, 1),
(1, 5),
(1, 6)

INSERT INTO posts_categories (post_id, category_id)
VALUES (2, 1),
(2, 5),
(2, 7)

INSERT INTO posts_categories (post_id, category_id)
VALUES (3, 9)

INSERT INTO posts_categories (post_id, category_id)
VALUES (4, 5)

INSERT INTO posts_categories (post_id, category_id)
VALUES (5, 4)

INSERT INTO posts_categories (post_id, category_id)
VALUES (6, 1),
(6, 5),
(6, 6)

INSERT INTO posts_categories (post_id, category_id)
VALUES (7, 1),
(7, 6)

INSERT INTO posts_categories (post_id, category_id)
VALUES (8, 4),
(8, 6)

INSERT INTO posts_categories (post_id, category_id)
VALUES (9, 1),
(9, 5)

INSERT INTO posts_categories(post_id, category_id)
VALUES (10,5),
(10,6)