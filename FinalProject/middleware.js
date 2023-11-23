const flash = require('connect-flash')
const Connection = require('./models/connection')

exports.setLocals = (req, res, next) => {
    res.locals.isAuthenticated = req.session.user ? true : false
    res.locals.username = req.session.username

    //req.flash('error', 'validation error')

    res.locals.successMessages = req.flash('success')
    res.locals.errorMessages = req.flash('error')

    next()
}

exports.isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next()
    }
    else {
        req.flash('error', 'guests cannot access that page')
        return res.redirect('/user/login')
    }
}

exports.isGuest = (req, res, next) => {
    if (!req.session.user) {
        return next()
    }
    else {
        req.flash('error', 'authenticated users cannot access that page')
        return res.redirect('/user/profile')
    }
}

exports.isHost = (req, res, next) => {
    const { connection_id } = req.params

    Connection.findById(connection_id)
    .then(connection => {
        if (connection) {
            const isHost = String(connection.user_id) === req.session.user
            res.locals.isHost = isHost
            
            next()
        }
    })
    .catch(err => next(err))
}

exports.isAuthorized = (req, res, next) => {
    if (res.locals.isHost) {
        return next()
    }
    else {
        const err = { code: 401, message: 'Unauthorized access attempt' }
        return next(err)
    }
}

exports.catchError = (err, req, res, next) => {
    if (err) {
        req.flash('error', err.message)
        res.redirect('back')
    }
    else if (res.status(404)) {
        const error = { code: 404, message: 'Page not found'}

        return res.render('pages/error', { error })
    }
}