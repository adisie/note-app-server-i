require('dotenv').config()
const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 5050 
const app = express()
const server = http.createServer(app)

// settings
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

// db connection
mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log('CONNECTED')
    server.listen(PORT,()=>{
        console.log('LISTENING')
    })
})
.catch(err=>{
    console.log('DB CONNECTION FAILED')
    process.exit(-1)
})

// routes
// users
app.use('/api/users',require('./routes/usersRoutes'))
// notes
app.use('/api/notes',require('./routes/notesRoutes'))
