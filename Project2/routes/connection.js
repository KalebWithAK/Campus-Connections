const router = require('express').Router()
const { getConnections, getConnectionById, createConnection, editConnection, removeConnection, getTopics } = require('../controllers/connection')

router.get('/', (req, res) => {
    const connections = getConnections()
    const topics = getTopics()
    
    return res.render('pages/connections', { connections, topics })
})

router.get('/id/:connection_id', (req, res) => {
    const connection = getConnectionById(req.params.connection_id)

    if (connection) {
        return res.render('pages/connection', { connection })
    }

    return res.render('pages/error')
})

router.get('/new', (req, res) => {

    return res.render('pages/newConnection')
})

router.post('/new', (req, res) => {
    createConnection(req.body)

    return res.redirect('/')
})

router.get('/edit/:connection_id', (req, res) => {
    const connection = getConnectionById(req.params.connection_id)

    return res.render('pages/editConnection', { connection })
})

router.post('/edit/:connection_id', (req, res) => {
    editConnection(req.params.connection_id, req.body)

    return res.redirect('/connection/id/' + req.params.connection_id)
})

module.exports = { connection_router: router }