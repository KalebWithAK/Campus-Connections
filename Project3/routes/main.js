const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('pages/index')
})

router.get('/about', (req, res) => {
    res.render('pages/about')
})

router.get('/contact', (req, res) => {
    res.render('pages/contact')
})
//router.get('/pages/error')

module.exports = { main_router: router }