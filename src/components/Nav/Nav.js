import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

const Nav = ({user: {username, profilePic}}) => (
    <header>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/new">New Post</NavLink>
        </nav>
        <div>
            <Link>{username}</Link>
            <img src={profilePic} alt={`${username} profile`}/>
        </div>
    </header>
)

const mapStateToProps = state => state
export default connect(mapStateToProps)(Nav)
