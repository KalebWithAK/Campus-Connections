const { ObjectId } = require('mongodb')

let connections
exports.getCollection = (db) => {
    connections = db.collection('connections')
}

exports.find = () => connections.find().toArray()

exports.findById = (id) => connections.findOne({ _id: new ObjectId(id) })

exports.save = (connection) => connections.insertOne(connection)

exports.update = (id, new_connection) => connections.updateOne({ _id: new ObjectId(id)}, { $set: new_connection})

exports.delete = (id) => connections.deleteOne({ _id: new ObjectId(id) })