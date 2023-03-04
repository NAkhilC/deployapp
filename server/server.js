const express = require('express')
const app = express()
var cors = require('cors')
const dotenv = require('dotenv').config()
const port = process.env.PORT
const cookieParser = require('cookie-parser')
const path = require('path')
const session = require('express-session')
const bodyParser = require('body-parser')
const db = require('./redisConnection')
const loginHandler = require('./handlers/login')
const signupHandler = require('./handlers/signup')

app.use(cookieParser(process.env.SESSIONSECRET))
app.use(
    cors({
        origin: ['http://localhost:4200'],
        origin: ['http://localhost:3000'],
        credentials: true,
    })
)

app.use(bodyParser.json())
app.use(express.static('ang-app')) //set the static path
app.set('view engine', 'pug')
app.use(
    session({
        secret: process.env.SESSIONSECRET,
        cookie: {
            maxAge: 36000,
            httpOnly: false,
            secure: true, // for normal http connection if https is there we have to set it to true
        },
        resave: false,
        saveUninitialized: true,
    })
)

db.createConnection()

app.post('/login', async (req, res) => {
    let result = await loginHandler.postHandler(req, res)
    return result
})
app.post('/signup', (req, res) => {
    let result = signupHandler.postHandler(req, res)
    return result
})

app.get('/test', async (req, res) => {
    let responseInfo
    if (req && req.session && req.session['cookie'] && req.session.user) {
        return await loginHandler.getHandler(req, res, req.session.token)
    } else {
        req.session.destroy()
        responseInfo = res.json({ status: 400 })
    }
    return responseInfo
})
app.get('/logout', (req, res) => {
    req.session.destroy()
    return res.json({ status: 200 })
})

app.get('*', async (req, res) => {
    // await client.json.set('homes:RA01001', '.', {
    //     beds: 3,
    //     id: 'RA01001',
    //     bath: 2,
    //     type: 'Residential',
    //     address: '187 Lilli st, Red Lake, Ontario, P8T Y6L',
    //     price: 299999,
    //     description:
    //         'ASK US ABOUT OUR FREE MEMBERPERKS PROGRAM FOR RESIDENTS. Fully renovated spacious suite with open-concept kitchen featuring chrome accents, breakfast bar, hard surface countertops, undermount double sink, and glass backsplash. Stainless-steel Refrigerator, Stove, Dishwasher (in select units) & Microwave are included. Bathrooms include upgraded fixtures, full size mirror, hard surface countertop, and undermount sink. The unit is freshly painted, has newly finished flooring, new tiles in the kitchen and bathrooms, brand-new light and hardware fixtures. This beautiful community has both apartments and townhomes and is located next to CF Fairview Mall and in close proximity to local shopping plazas for your day to day necessities. Its close-by parks, schools, medical facilities, has easy access to public transit via the TTC (closest subway station is Don Mills) and GO Transit, and is accessible to major highways. You can now view our properties via our 360 degree virtual tours from comfort of your home. Our on-site leasing consultants are also available to tour you through building amenities and available suites via a personal video call. Disclaimer - The unit photos and virtual tours displayed here are for representation purposes only. Available units and prices may vary based on unit location in building, unit size, features, finishes, floor plan and occupancy date. Prices shown are starting prices for each unit type and are subject to change without notice. Errors & Omissions excepted.',
    //     images: ['RA01001-01', 'RA01002-001', 'RA01003-001', 'SA01002-001'],
    // })
    res.sendFile('ang-app/index.html', { root: __dirname })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
