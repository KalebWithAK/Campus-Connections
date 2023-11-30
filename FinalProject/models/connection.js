const mongoose = require('mongoose')


const connectionSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'cannot be empty'] },
    topic: { type: String, required: [true, 'cannot be empty'] },
    details: { type: String },
    location: { type: String },
    date: { type: String, required: [true, 'cannot be empty'] },
    start_time: { type: String, required: [true, 'cannot be emtpy'] },
    end_time: { type: String, required: [true, 'cannot be empty'] },
    img: { type: String },
    user_id: { type: mongoose.Types.ObjectId },
    host: { type: String, required: [true, 'cannot be empty'] }
})

module.exports = mongoose.model('Connection', connectionSchema)