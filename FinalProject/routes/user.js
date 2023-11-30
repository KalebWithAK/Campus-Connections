const router = require('express').Router()
const controller = require('../controllers/user')
const { isAuthenticated, isGuest } = require('../middleware')
const {loginLimiter} = require('../middleware/rateLimiter')
const {validateLogin, validateSignUp,validateResults} = require('../middleware/validator')

router.get('/login', isGuest, (req, res) => res.render('./pages/login'))

router.post('/login',loginLimiter, isGuest,validateLogin,validateResults, controller.authenticate)

router.get('/register', isGuest, (req, res) => res.render('./pages/register'))

router.post('/register', validateSignUp,validateResults,isGuest, controller.new)

router.get('/profile', isAuthenticated, controller.profile)

router.get('/logout', isAuthenticated, controller.logout)

module.exports = router