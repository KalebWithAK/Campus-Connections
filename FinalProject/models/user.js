const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Connection = require('./connection')
const Rsvp = require('./rsvp')

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: [true, 'cannot be empty'] },
    last_name: { type: String, required: [true, 'cannot be empty' ] },
    email: { type: String, required: [true, 'cannot be empty' ], unique: true },
    password: { type: String, required: [true, 'cannot be empty' ] },
})

// replace plaintext password with hash password before saving
// pre middleware
userSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        next()
    } 
    else {
        bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash
            next()
        })
        .catch(err => next(err))
    }
})

// compare login password and hash stored in db
userSchema.methods.comparePassword = function (loginPassword, next) {
    return bcrypt.compare(loginPassword, this.password, next)
}

// get connections hosted by user
userSchema.methods.getConnections = function() {
    return Connection.find({ user_id: this._id })
}

// get user's rsvps
userSchema.methods.getRsvps = function() {
    return Rsvp.find({ user_id: this._id, status: 'yes' })
}

module.exports = mongoose.model('User', userSchema)