require('dotenv').config()
const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const socketio = require('socket.io')

const PORT = process.env.PORT || 5050 
const app = express()
const server = http.createServer(app)

// settings
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    origin: "*",
    credentials: true,
}))

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

// socket io
const io = socketio(server,{
    cors: {
        origin: "*",
    }
})


// online users
let onlineUsers = []

// add new online user 
const addNewOnlineUser = (data) => {
    let user = onlineUsers.find(us=>us.userId === data.userId) 
    if(!user){
        onlineUsers.push(data)
    }else{
        let index = onlineUsers.findIndex(user=>user.userId === data.userId)
        onlineUsers[index] = data
    }
}

// remove user 
const removeUser = userId => {
    onlineUsers = onlineUsers.filter(user=>user.userId !== userId)
}

// remove user on disconnect
const removeUserOnDisconnect = socketId =>{
    onlineUsers = onlineUsers.filter(user => user.socketId !== socketId)
}
// listen for connection
io.on('connection',socket=>{
    // notes
    // add new note
    socket.on('addNewNote',data=>{
        io.emit('addNewNoteEvent',data)
    })
    // delete note
    socket.on('deleteNote',_id => {
        io.emit('deleteNoteEvent',_id)
    })

    // new user
    socket.on('addNewUserOnSignup',user=>{
        addNewOnlineUser({userId:user._id,socketId: socket.id})
        io.emit('onlineUsers',onlineUsers)
        io.emit('addUserToList',user)
    })

    // online users
    // login
    socket.on('userLogin',userId=>{
        addNewOnlineUser({userId,socketId: socket.id})
        io.emit('onlineUsers',onlineUsers)
    })

    // user on reconnect
    socket.on('addUserOnReconnect',userId=>{
        addNewOnlineUser({userId,socketId: socket.id})
        io.emit('onlineUsers',onlineUsers)
    })

    // logout
    socket.on('userLogout',userId=>{
        removeUser(userId)
        io.emit('onlineUsers',onlineUsers)
    })

    // disconnect
    socket.on('disconnect',()=>{
        removeUserOnDisconnect(socket.id)
        io.emit('onlineUsers',onlineUsers)
    })

    io.emit('onlineUsers',onlineUsers)
})

// routes
// users
app.use('/api/users',require('./routes/usersRoutes'))
// notes
app.use('/api/notes',require('./routes/notesRoutes'))
