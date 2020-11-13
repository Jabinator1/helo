const bcrypt = require('bcrypt')
module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const {username, password, profilePic} = req.body

        const [checkUser] = await db.check_user(username)

        if (checkUser) return res.status(400).send("Username already taken")

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const [newUser] = await db.new_user(username, hash, profilePic)

        req.session.user = {
            userId: newUser.user_id,
            username: newUser.username,
            profilePic: newUser.profile_pic
        }
        res.status(200).send(req.session.user)
    },
    login: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body

        const [checkUser] = await db.check_user(username)

        if (!checkUser) return res.status(400).send("Invalid username/password")
        
        const auth = bcrypt.compareSync(password, checkUser.password)
        
        if (auth) {
            req.session.user = {
                userId: checkUser.user_id,
                username: checkUser.username,
                profilePic: checkUser.profile_pic
            }

            return res.status(200).send(req.session.user)
        } else {
            return res.status(401).send("Invalid username/password")
        }
    },
}