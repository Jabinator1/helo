import React from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

const Post = ({post: {title, username, profile_pic, user_id, post_id}, user: {userId}, deleteFn}) => {
    const location = useLocation()

    return (
        <div className={location.pathname === "/dashboard" ? "post-info" : "post-header-info"}>
            {location.pathname === "/dashboard" ? <Link className="post-link" to={`/post/${post_id}`}>{title}</Link> : <h1 className="post-title">{title}</h1>}
            <div className="post-profile-container">
                <Link className="post-profile-link" to={`/users/${userId}`}>by {username}</Link>
                <img className="post-profile-img" src={profile_pic} alt={`${username}'s profile`}/>
            </div>
            {userId === user_id ? <button className="delete-button" onClick={() => deleteFn(post_id)}>X</button> : null}
        </div>
    )
}

export default connect(state => state)(Post)
