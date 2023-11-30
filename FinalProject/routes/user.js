const router = require('express').Router()
const controller = require('../controllers/user')
const { isAuthenticated, isGuest } = require('../middleware')

router.get('/login', isGuest, (req, res) => res.render('./pages/login'))

router.post('/login', isGuest, controller.authenticate)

router.get('/register', isGuest, (req, res) => res.render('./pages/register'))

router.post('/register', isGuest, controller.new)

router.get('/profile', isAuthenticated, controller.profile)

router.get('/logout', isAuthenticated, controller.logout)

module.exports = router