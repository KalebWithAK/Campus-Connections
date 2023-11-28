const Connection = require('../models/connection')
const Rsvp = require('../models/rsvp')
const { ObjectId } = require('../utils')


exports.getConnections = (req, res, next) => {
    Connection.find({})
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

    Connection.findById(connection_id)
    .then(connection => {
        if (connection) {
            Rsvp.find({ connection_id, status: 'Yes' })
            .then(rsvps => {
                if (rsvps) {
                    res.render('pages/connection', { connection, rsvp_count: rsvps.length })
                }
            })
            .catch(err => next(err))
        }
    })
    .catch(err => next(err))
}

exports.save = (req, res, next) => {
    req.body.user_id = req.session.user
    req.body.host = req.session.username

    const connection = new Connection(req.body)
    connection.save()
    .then(() => res.redirect('/connection'))
    .catch(err => next(err))
}

exports.edit = (req, res, next) => {
    const { connection_id } = req.params

    Connection.findById(connection_id)
    .then(connection => {
        if (connection) {
            if (String(connection.user_id) === String(req.session.user)) {
                res.render('pages/editConnection', { connection })
            } else {
                res.redirect('/')
            }
        }
    })
    .catch(err => next(err))
}

exports.update = (req, res, next) => {
    const connection = { ...req.body, user_id: ObjectId(req.session.user) }
    const { connection_id } = req.params

    Connection.findByIdAndUpdate(connection_id, connection)
    .then(results => {
        if (results) {
            res.redirect('/connection/id/' + connection_id)
        }
        else {
            const err = { code: 404, message: 'cannot find story with id ' + connection_id }
            next(err)
        }
   })
   .catch(err => next(err))
}

exports.delete = (req, res, next) => {
    const { connection_id } = req.params

    Connection.findByIdAndDelete(connection_id)
    .then(results => {
        console.log(results)
        res.redirect('/connection')
    })
    .catch(err => next(err))
}