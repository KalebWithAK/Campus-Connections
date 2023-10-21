const model = require('../models/connections')
const { ObjectId } = require('mongodb')

exports.getConnections = (req, res, next) => {
    model.find()
    .then(connections => {
        const topics = []

        connections.forEach(connection => {
            if (!topics.includes(connection.topic)) {
                topics.push(connection.topic)
            }
        })

        res.render('pages/connections', { connections, topics })
    })  
    .catch(err => next(err))
}

exports.getConnection = (req, res, next) => {
    const { connection_id } = req.params
    model.findById(connection_id)
    .then(connection => {
        if (connection) {
            res.render('pages/connection', { connection })
        }
    })
    .catch(err => next(err))
}

exports.save = (req, res, next) => {
    const connection = req.body

    model.save(connection)
    .then(() => res.redirect('/connection'))
    .catch(err => next(err))
}

exports.edit = (req, res, next) => {
    const { connection_id } = req.params

    model.findById(connection_id)
    .then(connection => {
        if (connection) {
            res.render('pages/editConnection', { connection })
        }
    })
    .catch(err => next(err))
}

exports.update = (req, res, next) => {
    const connection = req.body
    const { connection_id } = req.params

    model.update(connection_id, connection)
    .then(results => {
        console.log(results)
        if (results.modifiedCount == 1) {
            res.redirect('/connection/id/' + connection_id)
        }
        else {
            const err = new Error('cannot find story with id ' + connection_id)
            err.status = 404
            next(err)
        }
   })
   .catch(err => next(err))
}

exports.delete = (req, res, next) => {
    const { connection_id } = req.params

    model.delete(connection_id)
    .then(results => {
        console.log(results)
        res.redirect('/connection')
    })
    .catch(err => next(err))
}