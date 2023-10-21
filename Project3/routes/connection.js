const router = require('express').Router()
const controller = require('../controllers/connection')


router.get('/', controller.getConnections)

router.get('/id/:connection_id', controller.getConnection)

router.get('/new', (req, res) => res.render('pages/newConnection'))

router.post('/new', controller.save)

router.get('/edit/:connection_id', controller.edit)

router.put('/edit/:connection_id', controller.update)

router.get('/delete/:connection_id', controller.delete)

module.exports = router