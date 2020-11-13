CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(20),
    password VARCHAR(20),
    profile_pic VARCHAR(1000)
);

CREATE TABLE helo_posts (
    post_id SERIAL PRIMARY KEY,
    title VARCHAR(45),
    img VARCHAR(1000),
    content VARCHAR(1000),
    user_id  INT REFERENCES users(user_id)
);

ALTER TABLE users
ALTER password TYPE VARCHAR(100);
-- I never do text after learning about potential security issues may arrise

--users dummy data
INSERT INTO users (username, password, profile_pic)
VALUES ('Jabinator1', 'jabby', 'https://yt3.ggpht.com/a-/AOh14GgC74SSZyf1igoqnjoHmFYEbFaHW2ioe5Y6PIqRYQ=s108-c-k-c0x00ffffff-no-rj'),
('Banana', 'Hannah', 'https://api.time.com/wp-content/uploads/2019/11/gettyimages-459761948.jpg?quality=85&w=1024&h=512&crop=1');

-- posts dummy data
INSERT INTO helo_posts (title, img, content, user_id)
VALUES ('Engaged!', 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p640x640/120163625_155620542595176_4016631722234976683_n.jpg?_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=100&_nc_ohc=SejCiXUsZxYAX8zLR1J&_nc_tp=24&oh=1987ca55e9b13897c6b28025aca65f65&oe=5FD760D0', 'Hannah and I just got engaged! Im so happy to spend the rest of my life with her!', 1);