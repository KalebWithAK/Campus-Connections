const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: { type: String, required: [true, 'cannot be empty'] },
    lastName: { type: String, required: [true, 'cannot be empty' ] },
    email: { type: String, required: [true, 'cannot be empty' ], unique: true },
    password: { type: String, required: [true, 'cannot be empty' ] },
})

// replace plaintext password with hash password before saving
// pre middleware
userSchema.pre('save', function (next) {
    let user = this

    if (!user.isModified('password')) {
        return next()
    }

    bcrypt.hash(user.password, 10)
    .then(hash => {
        user.password = hash
        next()
    })
    .catch(err => next(err))
})

// compare login password and hash stored in db
userSchema.methods.comparePassword = function (loginPassword) {
    return bcrypt.compare(loginPassword, this.password)
}

module.exports = mongoose.model('User', userSchema)