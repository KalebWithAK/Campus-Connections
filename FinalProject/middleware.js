const flash = require('connect-flash')
const Connection = require('./models/connection')

exports.setLocals = (req, res, next) => {
    res.locals.isAuthenticated = req.session.user ? true : false
    res.locals.user = req.session.user
    res.locals.username = req.session.username

    res.locals.successMessages = req.flash('success')
    res.locals.errorMessages = req.flash('error')

    next()
}

exports.isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next()
    }
    else {
        req.flash('error', 'You must login first!')
        return res.redirect('/user/login')
    }
}

exports.isGuest = (req, res, next) => {
    if (!req.session.user) {
        return next()
    }
    else {
        req.flash('error', 'Authenticated users cannot access that page')
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
    // user attempts to update or delete a connection that is not theirs
    else {
        const err = { code: 401, message: 'Only the host can perform that action' }
        return next(err)
    }
}

exports.catch404 = (req, res, next) => {
    const error = { code: 404, message: 'Page not found'}

    return res.render('pages/error', { error })
}

exports.catchError = (err, req, res, next) => {
    if (err) {
        console.log(err)
        req.flash('error', err.message)
        res.redirect('back')
    }
}

