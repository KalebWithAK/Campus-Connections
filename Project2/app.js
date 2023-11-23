const express = require('express')
const path = require('path')

const { catch404 } = require('./middleware')
const { main_router }  = require('./routes/main')
const { connection_router } = require('./routes/connection')

// server initialization
const app = express()
const port = 8084
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static(path.join(__dirname, 'public')))

// routers
app.use('/', main_router)
app.use('/connection/', connection_router)

// error handling
app.use(catch404)


app.listen(port, () => console.log(`http://localhost:${port}`)) 