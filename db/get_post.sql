SELECT p.post_id, p.title, p.img, p.content, p.user_id, u.username, u.profile_pic FROM helo_posts p
JOIN users u ON u.user_id = p.user_id
WHERE p.post_id = $1;