const router = require('express').Router()
const controller = require('../controllers/userController')

router.get('/new', controller.new)
router.post('/new', controller.save)

router.get('/login', controller.showLogin)
router.post('/login', controller.login)

router.get('/profile', controller.profile)

router.get('/logout', controller.logout)

module.exports = router