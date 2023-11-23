const router = require('express').Router()
const controller = require('../controllers/connection')
const { isAuthenticated, isHost, isAuthorized } = require('../middleware')


router.get('/', controller.getConnections)

router.get('/id/:connection_id', isHost, controller.getConnection)

router.get('/new', isAuthenticated, (req, res) => res.render('pages/newConnection'))

router.post('/new', isAuthenticated,  controller.save)

router.get('/edit/:connection_id', isAuthenticated, isHost, isAuthorized, controller.edit)

router.post('/edit/:connection_id', isAuthenticated, isHost, isAuthorized, controller.update)

router.get('/delete/:connection_id', isAuthenticated, isHost, isAuthorized, controller.delete)

module.exports = router