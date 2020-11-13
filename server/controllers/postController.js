module.exports = {
    getPosts: async (req, res) => {
        const db = req.app.get('db')
        const {userposts, userid, search} = req.query

        const posts = await db.get_posts([userposts, userid, search])
        res.status(200).send(posts)
    },
}