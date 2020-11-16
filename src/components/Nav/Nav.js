import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { loginUser, logoutUser } from '../../redux/reducer'
import { Link, NavLink, useHistory } from 'react-router-dom'
import axios from 'axios'

const Nav = ({user: {username, profilePic, userId}, loginUser, logoutUser}) => {
    const history = useHistory()
    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await axios.get("/api/auth/me")
                loginUser(user.data)
            } catch (err) {
                console.log(err)
            }
        }
        getUser()
    }, [loginUser])

    const logout = () => {
        logoutUser()
        history.push("/")
    }

    return (
        <header>
            <div className="profile-info">
                <img src={profilePic} alt={`${username} profile`} />
                <Link className="profile-link" to={`/users/${userId}`}>{username}</Link>
            </div>
            <div className="icons-container">
                <nav>
                    <NavLink to="/dashboard"><img className="nav-link" src="https://raw.githubusercontent.com/Jabinator1/simulation-3/master/assets/home_logo.png" alt="dashboard icon"/></NavLink>
                    <NavLink to="/new"><img className="nav-link" src="https://raw.githubusercontent.com/Jabinator1/simulation-3/master/assets/new_logo.png" alt="new post icon"/></NavLink>
                </nav>
                <button className="logout-button" onClick={logout}>
                    <img className="nav-link" src="https://raw.githubusercontent.com/Jabinator1/simulation-3/master/assets/shut_down.png" alt="logout-icon"/>
                </button>
            </div>
        </header>
    )
}

const mapStateToProps = state => state
export default connect(mapStateToProps, {loginUser, logoutUser})(Nav)
