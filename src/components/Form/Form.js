import axios from 'axios'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Form = ({user: {userId}}) => {
    const history = useHistory()
    const [state, setState] = useState({title: "", url: undefined, content: ""})
    const {title, url, content} = state


    const inputArr = [
        {label: "Title:", type: "text", name: "title"},
        {label: "Image URL", type: "url", name: "url"},
        {label: "Content:", name: "content"}
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
        <div className="form-page">
            <div className="form-container">
                <h1>New Post</h1>
                <form onSubmit={e => addPost(e)} className="form">
                    <img src={url || "https://raw.githubusercontent.com/Jabinator1/simulation-3/master/assets/no_image.jpg"} alt="user's url"/>
                    {inputArr.map(input => (
                        <div key={input.label} className="post-inputs-containers">
                            <label className="post-label">{input.label}</label>
                            { input.name === "content" ? (
                                <textarea className="post-input textarea" name={input.name} required="required" maxlength="1000" rows="3" onChange={e => setState({...state, [e.target.name]: e.target.value})}/>
                            ) : (
                                <input type={input.type} name={input.name} className="post-input" onChange={e => setState({...state, [e.target.name]: e.target.value})} />
                            )}
                        </div>
                    ))}
                    <div className="post-button">
                        <button type="submit" className="entry-button">Post</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = state => state
export default connect(mapStateToProps)(Form)
