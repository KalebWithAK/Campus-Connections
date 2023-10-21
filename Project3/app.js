const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const { MongoClient } = require('mongodb')
const path = require('path')

const { catch404 } = require('./middleware')
const { main_router }  = require('./routes/main')
const connection_router = require('./routes/connection')
const { getCollection } = require('./models/connections')

// server initialization
const app = express()
const port = 8084
const url = 'mongodb://localhost:27017'
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(morgan('tiny'))
app.use(methodOverride('_method'))

// routers
app.use('/', main_router)
app.use('/connection/', connection_router)

// error handling
app.use(catch404)

MongoClient.connect(url)
.then(client => {
    if (client) {
        const db = client.db('project3')
        
        getCollection(db)
        console.log('connected to database')

        app.listen(port, () => console.log(`http://localhost:${port}`)) 
    }
})