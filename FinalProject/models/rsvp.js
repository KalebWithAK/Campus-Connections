const mongoose = require('mongoose')
const Connection = require('./connection')

const rsvpSchema = new mongoose.Schema({
    user_id: { type: mongoose.ObjectId, required: [true, 'cannot be empty'] },
    connection_id: { type: mongoose.ObjectId, required: [true, 'cannot be empty'] },
    status: { type: String, required: [true, 'cannot be empty'] },
    title: { type: String },
    topic: { type: String },
})

rsvpSchema.pre('save', function(next) {
    console.log(this.isModified('title'), this.isMOdified('topic'))
    if (this.isModified('title') || this.isModified('topic')) {
        next()
    } 
    else {
        Connection.findById(this.connection_id)
        .then(connection => {
            if (connection) {
                this.title = connection.title
                this.topic = connection.topic
            }
        })
    }
})

rsvpSchema.methods.getConnection = () => {
    return Connection.findById(this.connection_id)
}

module.exports = mongoose.model('Rsvp', rsvpSchema)