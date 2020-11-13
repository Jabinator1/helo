import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Post = ({post: {title, username, profile_pic, user_id, post_id}}) => {
    return (
        <div>
            <Link to={`/post/${post_id}`}>
                <h2>{title}</h2>
                <div>
                    <Link to={`/users/${user_id}`}>{username}</Link>
                    <img src={profile_pic} alt={`${username}'s profile`}/>
                </div>
            </Link>
        </div>
    )
}

export default Post
