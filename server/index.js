require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const { register, login } = require('./controllers/authController')
const { getPosts } = require('./controllers/postController')
const app = express()

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

massive({connectionString: CONNECTION_STRING, ssl: {rejectUnauthorized: false}})
.then(db => {app.set('db', db); console.log('Connected to database!')})
.catch(err => console.log(err))

//# Auth Endpoints
app.post("/auth/login", login)
app.post("/auth/register", register)

//# Post Endpoints
app.get("/api/posts/search", getPosts)

app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}.`))