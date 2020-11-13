import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {loginUser} from '../../redux/reducer'
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios'

const Nav = ({user: {username, profilePic, userId}}) => {
    // useEffect(() => {
    //     const getUser = async () => {
    //         const user = await axios.get("/api/auth/me")
    //         this.props.loginUser(user.data)
    //     }

    //     getUser()
    // })

    return (
        <header>
            <div className="profile-info">
                <img src={profilePic} alt={`${username} profile`} />
                <Link className="profile-link" to={`/users/${userId}`}>{username}</Link>
            </div>
            <nav>
                <NavLink to="/dashboard"><img className="nav-link" src="https://raw.githubusercontent.com/Jabinator1/simulation-3/master/assets/home_logo.png" /></NavLink>
                <NavLink  to="/new"><img className="nav-link" src="https://raw.githubusercontent.com/Jabinator1/simulation-3/master/assets/new_logo.png" /></NavLink>
            </nav>
        </header>
    )
}

const mapStateToProps = state => state
export default connect(mapStateToProps, {loginUser})(Nav)
