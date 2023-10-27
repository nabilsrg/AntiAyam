const users = {}

io.on('connection', socket => {
    socket.emit('chat-message', 'Hello Socket Connect')
    socket.on('new-user', name => {
        users[socket.id] = req.session.username
    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
})