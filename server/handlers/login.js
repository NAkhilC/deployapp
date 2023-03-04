const uuid = require('node-uuid')
const jwt = require('jsonwebtoken')
const db = require('../redisConnection')
const users = [
    {
        userid: 'akhil',
        password: 'akhil',
    },
]
const postHandler = async (req, res) => {
    req.session.user = req.body?.email
    req.session.sessionId = uuid.v1()
    //let user = users.filter((obj) => Object.keys(obj).some((userid) => obj[userid].includes(req.body.email)))
    let client = await db.createDBClient()
    let user = await client.ft.search('idx:users', `@userId:${req.body.email}`)
    if (
        user &&
        user.documents &&
        user.documents[0]?.value.userId === req.body.email &&
        user.documents[0]?.value.password === req.body.password
    ) {
        let jwtSecretKey = process.env.JWT_SECRET_KEY
        let data = {
            time: Date(),
            userId: user.documents[0].value.userId,
        }
        const token = jwt.sign(data, jwtSecretKey, { expiresIn: '10s' })
        req.session.token = token
        const results = await client.ft.search('idx:homes', '*')
        if (results) {
            return res.json({ status: 200, user: req.body.email, token: token, data: results })
        }
        return res.json({ status: 204, user: req.body.email, token: token, data: [] })
    }
    return res.json({ status: 400 })
}
const getHandler = async (req, res, token) => {
    let client = await db.createDBClient()
    const results = await client.ft.search('idx:homes', '*')
    if (results) {
        if (results.documents.length > 0) {
            return res.json({ status: 200, user: req.body.email, token: token, data: results })
        }
        return res.json({ status: 204, user: req.body.email, token: token, data: [] })
    }
    return res.json({ status: 400 })
}

module.exports = { postHandler, getHandler }
