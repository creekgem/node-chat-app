const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public')

const server = http.createServer(app)
let io = socketio(server)

app.use(express.static(publicPath))

io.on('connection', (socket)=>{

    console.log('New user connected');
    
    socket.on('disconnect', ()=>{
        console.log('Client disconnect!');
        
    })

    socket.on('createMessage', (message)=>{
        console.log('createMessage', message);
        
    })

    socket.emit('newMessage', {
        from: 'Waseem',
        text: 'what\'s up',
        createdAt: 154565
    })

})



server.listen(port, ()=>{
    console.log(`Server started at :${port}`);
})