const router = require('express').Router()
const controller = require('../controllers/connection')
const { isAuthenticated, isHost, isAuthorized } = require('../middleware')
const{validateStory, validateResults} = require('../middleware/validator')



router.get('/', controller.getConnections)

router.get('/id/:connection_id', isHost, controller.getConnection)

router.get('/new', isAuthenticated, (req, res) => res.render('pages/newConnection'))

router.post('/new', isAuthenticated, validateStory,validateResults,controller.save)

router.get('/edit/:connection_id', isAuthenticated, isHost, isAuthorized, controller.edit)

router.post('/edit/:connection_id', isAuthenticated ,validateStory,validateResults,isHost, isAuthorized, controller.update)

router.get('/delete/:connection_id', isAuthenticated, isHost, isAuthorized, controller.delete)

module.exports = router


