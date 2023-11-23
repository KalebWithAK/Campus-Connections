const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const { MongoClient } = require('mongodb')
const path = require('path')

const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const mongoose = require('mongoose')


const { catchError, setLocals } = require('./middleware')
const main_router  = require('./routes/main')
const connection_router = require('./routes/connection')
const user_router = require('./routes/user')

// server initialization
const app = express()
const port = 8084
const mongoUrl = 'mongodb://localhost:27017/final-project'
app.set('view engine', 'ejs')

// connect to db
mongoose.connect(mongoUrl, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, useFindAndModify: false 
})
.then(() => {
    console.log('mongoose connected')
    app.listen(port, () => console.log(`http://localhost:${port}/`)) 
})
.catch((err) => console.log(err.message))

// mount middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('tiny'))
app.use(methodOverride('_method'))
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: 'adsf8aogyuvbqfasydufvab872',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
    store: new MongoStore({ mongoUrl })
}))
app.use(flash())
app.use(setLocals)

// testing middleware
app.use((req, res, next) => {
    console.log('username:', req.session.username)

    next()
})

// routers
app.use('/', main_router)
app.use('/connection/', connection_router)
app.use('/user/', user_router)

// error handling
app.use(catchError)