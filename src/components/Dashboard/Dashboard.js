import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Post from '../Post/Post'

const Dashboard = ({user: {userId}}) => {
    const [search, setSearch] = useState("")
    const [checkbox, setCheckbox] = useState(true)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        let ignore = false

        const fetchPosts = async () => {
            try {
                const postsData = await axios.get(`/api/posts/search?userposts=${checkbox}&userid=${userId}&search=${search}`)
                if (!ignore) setPosts(postsData.data)
            } catch (err) {
                console.log(err.response.request.response)
            }
        }

        fetchPosts()
        return () => { ignore = true }
    }, [search, checkbox, userId])

    return (
        <div>
            <div>
                <input type="search" placeholder="Search by title" onChange={e => setSearch(e.target.value)}/>
            </div>
            <div>
                <label for="checkbox">My posts</label>
                <input type="checkbox" name="checkbox" checked={checkbox} onChange={() => setCheckbox(!checkbox)}/>
            </div>
            <main>
                {posts.map(post => <Post key={post.post_id} post={post}/>)}
            </main>
        </div>
    )
}

export default connect(state => state)(Dashboard)
