const router = require('express').Router()
const controller = require('../controllers/connection')


router.get('/', controller.getConnections)

router.get('/id/:connection_id', controller.getConnection)

router.get('/new', (req, res) => res.render('pages/newConnection'))

router.post('/new', controller.save)

router.get('/:connection_id/edit', controller.edit)

router.put('/:connection_id', controller.update)

router.delete('/:connection_id', controller.delete)

module.exports = router

