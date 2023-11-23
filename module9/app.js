//require modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const User = require('./models/user');

//create app
const app = express();

//configure app
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

//connect to database
mongoose.connect('mongodb://localhost:27017/demos', 
                {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(()=>{
    app.listen(port, host, ()=>{
        console.log('Server is running on port', port);
    });
})
.catch(err=>console.log(err.message));


//mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));

app.use(express.static('./public'))

app.use(session({
    secret: 'adsf8aogyuvbqfasydufvab872',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
    store: new MongoStore({ mongoUrl: 'mongodb://localhost:27017/demos' })
}))

app.use(flash())


app.use((req, res, next) => {
    console.log(req.session)
    res.locals.successMessages = req.flash('success')
    res.locals.errorMessages = req.flash('error')
    next()
})


//set up routes
app.get('/', (req, res)=>{
    res.render('index');
});

// get signup form
app.get('/new', (req, res) => {
    res.render('new')
})

app.post('/', (req, res, next) => {
    const user = new User(req.body)
    user.save()
    .then(() => res.redirect('/login'))
    .catch(err => {
        if (err.name === 'ValidationError') {
            req.flash('error', err.message)
            return res.redirect('/new')
        }
        else if (err.code === 11000) {
            req.flash('error', 'duplicate email address')
            return res.redirect('/new')
        }

        next(err)
    })
})

app.get('/login', (req, res) => {
    console.log(req.flash())
    return res.render('login')
})

app.post('/login', (req, res, next) => {
    const { email, password } = req.body

    // get user that matches email
    User.findOne({ email })
    .then(user => {
        if (user != null) {
            // user found in db
            user.comparePassword(password)
            .then(result => {
                if (result) {
                    req.session.user = user._id // store user's id in session
                    req.flash('success', 'successfully logged in')
                    return res.redirect('/profile')
                }
                else {
                    req.flash('error', 'incorrect password')
                    return res.redirect('/login')
                }
            })
            .catch(err => next(err))
        }
        else {
            //console.log(console.log('user not found'))
            req.flash('error', 'invalid email')
            return res.redirect('/login')
        }
    })
    .catch(err => next(err))
})

app.get('/profile', (req, res, next) => {
    const id = req.session.user
    console.log(req.flash())

    if (!id) {
        return res.redirect('/')
    }

    User.findById(id)
    .then(user => res.render('profile', { user }))
    .catch(err => next(err))
})


app.get('/logout', (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            next(err)
        }
        else {
            return res.redirect('/')
        }
    })
})

// error handling
app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);

});

app.use((err, req, res, next) => {
    console.log(err.stack);
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }

    return res.status(err.status).render('error', {error: err});
});