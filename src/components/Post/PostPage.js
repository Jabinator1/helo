import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Post from './Post'

const PostPage = ({match: {params: {postid}}}) => {
    const [post, setPost] = useState({}) 

    useEffect(() => {
        let ignore = false

        const fetchPosts = async () => {
            try {
                const post = await axios.get(`/api/posts/${postid}`)
                if (!ignore) setPost(post.data)
            } catch (err) {
                console.log(err.response.request.response)
            }
        }

        fetchPosts()
        return () => { ignore = true }
    }, [postid])

    return (
        <div>
            <Post post={post}/>
            <div>
                <img src={post.img} alt={post.content}/>
                <p>{post.content}</p>
            </div>
        </div>
    )
}

export default PostPage
