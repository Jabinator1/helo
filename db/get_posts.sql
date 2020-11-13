SELECT p.post_id, p.title, p.img, p.content, p.user_id, u.username, u.profile_pic FROM helo_posts p
JOIN users u ON u.user_id = p.user_id
WHERE CASE WHEN $1 THEN u.user_id != $2 ELSE false END 
AND LOWER(p.title) LIKE LOWER('%' || $3 || '%');