const User = require('../models/user')
const Connection = require('../models/connection')

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
            // get connections
            user.getConnections()
            .then(connections => {
                if (connections) {
                    // get rsvps
                    user.getRsvps()
                    .then(rsvps => {
                        if (rsvps) {
                            console.log(rsvps)
                            /*Connection.findById(rsvps[0]._id)
                            .then(connection => {
                                if (connection) {
                                    console.log(connection)
                                    return { 
                                        title: connection.title, 
                                        topic: connection.topic, 
                                        status: rsvp.status, 
                                        connection_id: rsvp.connection_id 
                                    }
                                }
                            })
                            .catch(err => next(err))*/
                            
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