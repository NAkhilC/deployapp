const express = require('express')
const app = express()
var cors = require('cors')
const dotenv = require('dotenv').config()
const port = process.env.PORT
const cookieParser = require('cookie-parser')
const path = require('path')
const session = require('express-session')
const bodyParser = require('body-parser')
const uuid = require('node-uuid')
const jwt = require('jsonwebtoken')
app.use(cookieParser(process.env.SESSIONSECRET))
app.use(
    cors({
        origin: ['http://localhost:4200'],
        origin: ['http://localhost:3000'],
        credentials: true,
    })
)

const users = [
    {
        userid: 'akhil',
        password: 'akhil',
    },
]

app.use(bodyParser.json())
app.use(express.static('ang-app')) //set the static path
app.set('view engine', 'pug')
app.use(
    session({
        secret: process.env.SESSIONSECRET,
        cookie: {
            maxAge: 36000,
            httpOnly: false,
            secure: false, // for normal http connection if https is there we have to set it to true
        },
        resave: false,
        saveUninitialized: true,
    })
)

app.post('/login', (req, res) => {
    console.log(req.body)
    req.session.user = req.body?.email
    req.session.sessionId = uuid.v1()
    let user = users.filter((obj) => Object.keys(obj).some((userid) => obj[userid].includes(req.body.email)))
    if (user[0]?.userid === req.body.email && user[0].password === req.body.password) {
        let jwtSecretKey = process.env.JWT_SECRET_KEY
        let data = {
            time: Date(),
            userId: req.body.email,
        }
        const token = jwt.sign(data, jwtSecretKey, { expiresIn: '10s' })
        req.session.token = token
        return res.json({ status: 200, user: req.body.email, token: token })
    }
    return res.json({ status: 400 })
})

app.get('/test', (req, res) => {
    if (req && req.session && req.session['cookie']) {
        return res.send({ status: 200, user: req.session.user, token: req.session.token })
    }
})

app.get('*', (req, res) => {
    res.sendFile('ang-app/index.html', { root: __dirname })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
