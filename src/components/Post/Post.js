import React from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

const Post = ({post: {title, username, profile_pic, user_id, post_id}, user: {userId}, deleteFn}) => {
    const location = useLocation()

    return (
        <div className="post-info">
            {location.pathname === "/dashboard" ? <Link className="post-link" to={`/post/${post_id}`}>{title}</Link> : <h1>{title}</h1>}
            {userId === user_id ? <button onClick={() => deleteFn(post_id)}>Delete Post</button> : null}
            <div className="post-profile-container">
                <Link className="post-profile-link" to={`/users/${userId}`}>{username}</Link>
                <img className="post-profile-img" src={profile_pic} alt={`${username}'s profile`}/>
            </div>
        </div>
    )
}

export default connect(state => state)(Post)
