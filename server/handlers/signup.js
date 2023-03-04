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
    if (user && user.documents.length < 1) {
        let userCreated = await client.json.set(`users:${req.body.email}`, '.', {
            userId: req.body.email,
            password: req.body.password,
        })
        console.log(userCreated)
        return res.json({ status: 200 })
    }
    return res.json({ status: 400 })
}

const testLoad = async (req, res) => {}

module.exports = { postHandler }
