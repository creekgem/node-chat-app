const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const {generateMessage} = require('./utils/message')

const app = express()
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public')

const server = http.createServer(app)
let io = socketio(server)

app.use(express.static(publicPath))

io.on('connection', (socket)=>{

    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app!'))

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'User just join the chat app!'))

    
    socket.on('disconnect', ()=>{
        console.log('Client disconnect!');
        
    })

    socket.on('createMessage', (message, callback)=>{
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text))
        callback('This is from the server');
       // socket.broadcast.emit('newMessage', generateMessage(message.from, message.text))
    })


})



server.listen(port, ()=>{
    console.log(`Server started at :${port}`);
})