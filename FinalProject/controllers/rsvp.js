const Rsvp = require('../models/rsvp')

exports.setStatus = (req, res) => {
    const { connection_id, user_id, status, title, topic } = req.params

    Rsvp.findOneAndUpdate({ connection_id, user_id }, { status, title, topic }, { 
        upsert: true,
        new: true
     })
    .then(result => {
        if (result) {
            req.flash('success', 'updated rsvp')
            res.redirect('/connection/id/' + connection_id)
        }
    })
    .catch(err => next(err))
}