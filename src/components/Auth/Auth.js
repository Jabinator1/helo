import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../redux/reducer'

class Auth extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
            loggingIn: true
        }
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    entryFn = async e => {
        e.preventDefault()
        const {username, password, loggingIn} = this.state
        const profilePic = `https://robohash.org/${username}`
        try {
            const user = await axios.post(`/auth/${loggingIn ? "login" : "register"}`, loggingIn ? {username, password} : {username, password, profilePic})
            this.props.loginUser(user.data)
            this.props.history.push("/dashboard")
        } catch (err) {
            console.log(err.response.request.response)
        }
    }
    render() {
        const {loggingIn} = this.state
        return (
            <div>
                <form onSubmit={e => this.entryFn(e)}>
                    <input name="username" type="text" onChange={e => this.changeHandler(e)}/>
                    <input name="password" type="password" onChange={e => this.changeHandler(e)}/>
                    <button type="submit">{loggingIn ? "Login" : "Register"}</button>
                </form>
                <button onClick={() => this.setState({loggingIn: !loggingIn})}>{loggingIn ? "Create an account?" : "Already have an account?"}</button>
            </div>
        )
    }
}

export default connect(null, {loginUser})(Auth)
