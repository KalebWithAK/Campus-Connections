const mongoose = require('mongoose')
const User = require('../models/user')
const flash = require('connect-flash')

exports.new = (req, res) => res.render('./user/new')

exports.save = (req, res, next) => {
    const user = new User(req.body)
    console.log(user)
    user.save()
    .then(() => this.login(req, res, next))
    .catch(err => next(err))
}   

exports.showLogin = (req, res) => res.render('./user/login')

exports.login = function (req, res, next) {
    const { email, password } = req.body

    User.findOne({ email })
    .then(user => {
        if (user != null) {
            user.comparePassword(password)
            .then(result => {
                if (result) {
                    req.session.user = user._id
                    req.flash('success', 'logged in')
                    res.redirect('/users/profile')
                }
                else {
                    req.flash('error', 'incorrect password')
                    res.redirect('/users/login')
                }
            })
            .catch(err => next(err))
        }
        else {
            req.flash('error', 'invalid email')
            res.redirect('/users/login')
        }
    })
    .catch(err => next(err))
}

exports.profile = (req, res, next) => {
    const id = req.session.user

    if (!id) {
        res.redirect('/')
    }

    User.findById(id)
    .then(user => res.render('./user/profile', { user }))
    .catch(err => next(err))
}

exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) next(err)
        else {
            res.redirect('/')
        }
    })
}