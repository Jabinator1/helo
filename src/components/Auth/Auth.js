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

        if (!username || !password) return alert("You need to enter both a valid username and password")
        
        try {
            const user = await axios.post(`/auth/${loggingIn ? "login" : "register"}`, loggingIn ? {username, password} : {username, password, profilePic})
            this.props.loginUser(user.data)
            this.props.history.push("/dashboard")
        } catch (err) {
            alert(err.response.request.response)
        }
    }
    
    render() {
        const {loggingIn} = this.state
        const inputsArr = [
            {label: "Username:", type: "text", name: "username"},
            {label: "Password:", type: "password", name: "password"}
        ]

        return (
            <div className="auth-page">
                <div className="auth-container">
                    <form className="auth-form" onSubmit={e => this.entryFn(e)}>
                        <div className="auth-logo-container">
                            <img src="https://raw.githubusercontent.com/Jabinator1/simulation-3/master/assets/helo_logo.png" alt="Helo Logo"/>
                            <h1>Helo</h1>
                        </div>
                        <div className="auth-inputs">
                            {inputsArr.map(input => (
                                <div className="auth-input-container" key={input.label}>
                                    <label>{input.label}</label>
                                    <input name={input.name} type={input.type} onChange={e => this.changeHandler(e)}/>
                                </div>
                            ))}
                        </div>
                        <div className="auth-buttons">
                            <button className="entry-type-button" type="reset" onClick={() => this.setState({loggingIn: !loggingIn})}>{loggingIn ? "Need an account?" : "Already have an account?"}</button>
                            <button className="entry-button" type="submit">{loggingIn ? "Login" : "Register"}</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(null, {loginUser})(Auth)
