module.exports = {
    getPosts: async (req, res) => {
        const db = req.app.get('db')
        const {userposts, userid, search} = req.query

        try {
            const posts = await db.get_posts([userposts, userid, search])
            res.status(200).send(posts)
        } catch (err) {
            console.log(err)
        }
    },
    getPost: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params

        const [post] = await db.get_post(id)
        res.status(200).send(post)
    },
    addPost: async (req, res) => {
        const db = req.app.get('db')
        const {title, url, content, userId} = req.body

        await db.add_post([title, url, content, userId])
        res.sendStatus(200)
    },
    deletePost: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params

        await db.delete_post(id)
        res.sendStatus(200)
    },
}