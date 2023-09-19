const express = require('express')
const app = express()
const port = 8084
const path = require('path')
const bodyParser = require('body-parser')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/public', express.static(path.join(__dirname, 'public')))

const { main_router }  = require('./routes/main')
const { connection_router } = require('./routes/connection')

app.use('/', main_router)
app.use('/connection/', connection_router)

app.listen(port, () => console.log(`http://localhost:${port}`)) 