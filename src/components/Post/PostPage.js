import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Post from './Post'

const PostPage = ({match: {params: {postid}}}) => {
    const [post, setPost] = useState(undefined) 

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
        <div className="post-page">
            { post === undefined ? <img src="https://crossover.evoqondemand.com/Portals/0/Images/Map/xopreload.gif" alt="loading-gif"/> : (
                <div className="post-container">
                    <Post post={post}/>
                    <div className="post-content">
                        <img src={post.img} alt={`${post.username}'s upload`}/>
                        <p>{post.content}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PostPage
