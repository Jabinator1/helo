import axios from 'axios'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Form = ({user: {userId}}) => {
    const history = useHistory()
    const [state, setState] = useState({title: "", url: "", content: ""})
    const {title, url, content} = state


    const inputArr = [
        {label: "Title:", type: "text", name: "title"},
        {label: "Image URL", type: "url", name: "url"},
        {label: "Content:", type: "text", name: "content"}
    ]

    const addPost = async e => {
        e.preventDefault()
        try {
            await axios.post("/api/posts", {title, url, content, userId})
            history.push("/dashboard")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <form onSubmit={e => addPost(e)}>
                <img src={url} alt="user's url"/>
                {inputArr.map(input => (
                    <div key={input.label}>
                        <label>{input.label}</label>
                        <input type={input.type} name={input.name} onChange={e => setState({...state, [e.target.name]: e.target.value})} />
                    </div>
                ))}
                <button type="submit">Post</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => state
export default connect(mapStateToProps)(Form)
