const express = require('express')
const massive = require('massive')
const session = require('express-session')
require('dotenv').config()
const app = express()
const authCtrl = require('./controllers/AuthCtrl.js')
const pokeCtrl = require('./controllers/PokeCtrl')

const {serverPort, connectionString, secret} = process.env

app.use(express.json())
app.use(
    session({
        resave: false,
        saveUninitialized: true,
        cookie: {maxAge: 1000 * 60 * 60 * 24 * 14},
        secret
    })
)

// Auth endpoints
app.post('/auth/login', authCtrl.login)
app.post('/auth/register', authCtrl.register)
app.put('/auth/update', authCtrl.update)
app.delete('/auth/logout', authCtrl.logout)
app.get('/auth/user', authCtrl.getUser)

// Pokemon endpoints
app.get('/api/pokemon', pokeCtrl.getAll)
app.get('/api/pokemon/:poke_id', pokeCtrl.getPoke)
app.post('/api/add', pokeCtrl.add)
app.put('/api/update', pokeCtrl.update)
app.delete('/api/delete', pokeCtrl.delete)

massive({
    connectionString,
    ssl: { rejectUnauthorized: false }
}).then ( db => {
    app.set('db', db)
    console.log('db connected')
    app.listen(serverPort, () => console.log(`Showing off shiny pokemon on port ${serverPort}`))
}).catch ( err => console.log(err))