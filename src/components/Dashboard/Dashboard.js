import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Post from '../Post/Post'

const Dashboard = ({user: {userId}}) => {
    const [search, setSearch] = useState("")
    const [checkbox, setCheckbox] = useState(true)
    const [posts, setPosts] = useState(undefined)
    const [test, setTest] = useState("test")
    
    useEffect(() => {
        let ignore = false

        const fetchPosts = async () => {
            try {
                const posts = await axios.get(`/api/posts/search?userposts=${checkbox}&userid=${userId}&search=${search}`)
                if (!ignore) setPosts(posts.data)
            } catch (err) {
                console.log(err.response.request.response)
            }
        }

        fetchPosts()
        return () => { ignore = true }
    }, [search, checkbox, userId, test])

    const deleteFn = async post_id => {
        await axios.delete(`/api/posts/${post_id}`)
        setTest()
    }
    
    return (

        <div className="dashboard-container">
            <div>
                <div className="dashboard-header">
                    <div className="search-container">
                        <input type="search" placeholder="Search by title" onChange={e => setSearch(e.target.value)}/>
                        <img src="https://raw.githubusercontent.com/DevMountain/simulation-3/master/assets/search_logo.png" alt="Search icon"/>
                    </div>
                    <div>
                        <label>My posts</label>
                        <input type="checkbox" name="checkbox" checked={checkbox} onChange={() => setCheckbox(!checkbox)}/>
                    </div>
                </div>
                <main>
                    { posts === undefined ? <img src="https://crossover.evoqondemand.com/Portals/0/Images/Map/xopreload.gif"/> : (
                        posts.map(post => <Post key={post.post_id} post={post} deleteFn={deleteFn}/>)
                    )}
                </main>
            </div>
        </div>
    )
}

export default connect(state => state)(Dashboard)
