const socket = io()
const socket1 = io('/admin')
socket1.on('connect',() => {
    console.log(socket1.id);
})
socket1.on('welcome',(data) => {
    console.log(data);
})
socket.on('connect',() => {
    console.log(socket.id);
    socket.onAny(event => {
        console.log(event);
    })
    socket.on('messageFromServer',(message) => {
        console.log(message);
        socket.emit('messageToServer',{data: 'I am excited for the future'})
    })
    document.querySelector('#message-form').addEventListener('submit',event => {
        event.preventDefault();
        const newMessage = document.querySelector('#user-message').value
        socket.emit('newMessageToServer',{text: newMessage})
    })
    socket.on('joined',(msg) => {
        console.log(msg)
    })
})


