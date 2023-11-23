//require modules
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const storyRoutes = require('./routes/storyRoutes')
const userRoutes = require('./routes/userRoutes')
const { MongoClient } = require('mongodb')
const { getCollection } = require('./models/story')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const mongoose = require('mongoose')

//create ap
const app = express()

//configure app
let port = 3000
let host = 'localhost'
let url = 'mongodb://localhost:27017'
app.set('view engine', 'ejs')

//mount middlware
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(morgan('tiny'))
app.use(methodOverride('_method'))

app.use(session({
    secret: 'adsf8aogyuvbqfasydufvab872',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
    store: new MongoStore({ mongoUrl: url })
}))

// connect to mongodb
MongoClient.connect(url)
.then(client => {
    if (client) {
        const db = client.db('module7')
        getCollection(db)
        console.log('connected to mongodb')

        mongoose.connect(url + '/module7', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true  })
        .then(() => {
            app.listen(port, host, () => {
                console.log('Server running on http://localhost:' + port)
            })
        })
        .catch((err) => console.log(err.message))
    }
})
.catch(err => console.log(err.message))




// mount middleware
app.use(session({
    secret: 'pa98ge7buifq987gaadsfa13r',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
    store: new MongoStore({ mongoUrl: url + '/module7'})
}))

app.use(flash())

app.use((req, res, next) => {
    res.locals.successMessages = req.flash('success')
    res.locals.errorMessages = req.flash('error')
    next()
})

//set up routes
app.get('/', (req, res) => {
    res.render('index')
});

app.use('/stories', storyRoutes)
app.use('/users', userRoutes)

// error handling
app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url)
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    console.log(err.stack)
    if(!err.status) {
        err.status = 500
        err.message = ("Internal Server Error")
    }

    res.status(err.status).render('error', {error: err})
})