//const { ObjectId, Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let connections
exports.getCollection = (db) => {
    connections = db.collection('connections')
}

const connectionsSchema = new Schema({
    connection_name: {type: String, required: [true, 'title is required']},
    topic: {type: String, required: [true, 'author is required']},
    host_name: {type: String, required:[true, 'host name is required']},
    details: {type: String, required: [true, 'content is required'], 
            minLength: [10, 'Details should be atleast 10 characters']},
    location: {type: String, required:[true, 'location is required']},
    date: {type: String, required: [true, 'content is required']},
    start_time: {type: String, required: [true, 'content is required']},
    end_time: {type: String, required: [true, 'content is required']},
    img: {type: String, required: [false, 'image is required']}
},
{timestamps: true}
);

module.exports = mongoose.model('Connections', connectionsSchema);

// exports.find = () => connections.find().toArray()

// exports.findById = (id) => connections.findOne({ _id: new ObjectId(id) })

// exports.save = (connection) => connections.insertOne(connection)

// exports.update = (id, new_connection) => connections.updateOne({ _id: new ObjectId(id)}, { $set: new_connection})

// exports.delete = (id) => connections.deleteOne({ _id: new ObjectId(id) })

// const Connection = mongoose.model('Connections', connectionsSchema);
// const connection = new Connection({
//     connection_name: 'Stuff',
//     topic: 'TOPIC',
//     host_name: 'Justin',
//     details: 'blah blah blabh blah',
//     date: '11-11-11',
//     start_time: '11-11',
//     end_time: '12-12'
// });

// console.log(connection);
// connection.validate()
// .then(()=>console.log('VALIDATED GOOD'))
// .catch(err=>console.log(err.message));
