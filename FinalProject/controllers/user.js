const User = require('../models/user')

exports.authenticate = (req, res, next) => {
    const { email, password } = req.body

    // find user with email
    User.findOne({ email })
    .then(user => {
        if (user) {
            // compare password and stored hash
            user.comparePassword(password, (err, result) => {
                if (err) {
                    next(err)
                }
                else if (result) {
                    console.log(result)
                    // save user id in session
                    req.flash('success', 'user authenticated')
                    req.session.user = user._id
                    req.session.username = user.first_name
                    console.log(user._id)
                    res.redirect('/user/profile')
                }
                else {
                    const err = { code: 400, message: 'incorrect password' }
                    next(err)
                }
            })
        }
        else {
            const err = { code: 400, message: 'no user was found with that email' }
            next(err)
        }
    })
    .catch(err => next(err))
}

exports.new = (req, res, next) => {
    const user = new User(req.body)
    user.save()
    .then(() => {
        this.authenticate(req, res, next)
    })
    .catch(err => next(err))
}

exports.profile = (req, res, next) => {
    User.findById(req.session.user)
    .then(user => {
        if (user) {
            user.getConnections()
            .then(connections => {
                if (connections) {
                    user.getRsvps()
                    .then(rsvps => {
                        if (rsvps) {
                            rsvps = rsvps.map(r => {
                                r.getConnection()
                                .then(connection => {
                                    return { ...rsvp, title: connection.title, topic: connection.topic }
                                })
                                .catch(err => next(err))
                            })

                            res.render('./pages/profile', { user, connections, rsvps })
                        }
                    })
                    .catch(err => next(err))
                }
            })
            .catch(err => next(err))
        }
    })
    .catch(err => next(err))
}


exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            next(err)
        }
        else {
            res.redirect('/')
        }
    })
}