const mongoose = require('mongoose')

exports.randomString = (length = 8) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz'

    let result = ''
    
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length)).toUpperCase()
    }

    return result
}

exports.ObjectId = (id) => mongoose.Types.ObjectId(id)
