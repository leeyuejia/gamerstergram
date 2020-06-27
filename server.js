require('dotenv').config()
const express = require('express')
const session = require('express-session')
const app = express()

const port = process.env.PORT || 8080
const methodOverride = require('method-override')
const db = require('./db')

// MIDDLEWARE //////////////////////
app.use(session({
    secret: process.env.SECRET || 'mySecret',
    resave: false,
    saveUninitialized: false
}));
app.set('view engine', 'ejs')
app.use('/public', express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'));



db.connect().then(() => app.emit('ready'));

require('./routes')(app)

app.on('ready', () => {
    app.listen(port, () => {
        console.log(`server listening at port : ${port}`)
    })
})