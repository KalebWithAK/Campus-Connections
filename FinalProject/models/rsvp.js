const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const Connection = require('./connection')

const Schema = mongoose.Schema

const rsvpSchema = Schema({
    user_id: { type: ObjectId, required: [true, 'cannot be empty'] },
    connection_id: { type: ObjectId, required: [true, 'cannot be empty'] },
    status: { type: String, required: [true, 'cannot be empty'] },
})

rsvpSchema.methods.getConnection = () => {
    return Connection.findById(this.connection_id)
}

module.exports = mongoose.model('Rsvp', rsvpSchema)