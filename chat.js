const express = require('express');
const app = express();
const socketio = require('socket.io');
app.use(express.static(__dirname+'/public'))
const expressServer = app.listen(3000,() => {
    console.log("Server successfully connected")
})
const io = socketio(expressServer);
io.on('connection',(socket) => {
    socket.on('messageToServer',(msg) => {
        console.log(msg);
    })
    socket.emit('messageFromServer',{data: "Welcome to the socket io  world"})
    socket.on('newMessageToServer',(msg) => {
        console.log(msg);
        io.emit('messageToClient',{...msg})
    })
    socket.join('level1')
    io.of('/').to('level1').emit('joined',{some: 'data' })
})
io.of('/admin').on('connection',(socket) => {
    console.log("Welcome to another name space.....");
    socket.emit('welcome','to another name space')
})