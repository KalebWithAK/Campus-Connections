const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const { MongoClient } = require('mongodb')
const path = require('path')

const { catch404 } = require('./middleware')
const { main_router }  = require('./routes/main')
const connection_router = require('./routes/connection')
const { getCollection } = require('./models/connections')
const { mongoose } = require('mongoose')

// server initialization
const app = express()
const port = 8084
//const url = 'mongodb://localhost:27017'
let url = 'mongodb://127.0.0.1:27017/NBAD';
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(morgan('tiny'))
app.use(methodOverride('_method'))

mongoose.connect(url)
.then(()=> {
    //start the server
    app.listen(port, 'localhost', ()=>{
    console.log(`Server is running on port http://localhost:${port}`);
});
})

// routers
app.use('/', main_router)
app.use('/connection/', connection_router)

// error handling
app.use(catch404)

// MongoClient.connect(url)
// .then(client => {
//     if (client) {
//         const db = client.db('NBAD')
        
//         getCollection(db)
//         console.log('connected to database')

//         app.listen(port, () => console.log(`http://localhost:${port}`)) 
//     }
// })  