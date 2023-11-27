const router = require('express').Router()
const controller = require('../controllers/rsvp')

router.get('/user/:user_id/connection/:connection_id/status/:status/title/:title/topic/:topic', controller.setStatus)

module.exports = router