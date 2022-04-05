const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const {generateMessage, generateLocationMessage} = require('./utils/messages')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))


const port = process.env.PORT || 3000


io.on('connection', (socket) => {
    console.log('New webSocket connection')

    socket.on('join', ({username, room}) => {
        socket.join(room)

        socket.emit('messageUpdated', generateMessage('Welcome!'))
        socket.broadcast.to(room).emit('messageUpdated', generateMessage(`${username} has joined!`))
    })

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        if(filter.isProfane(message)){
            return callback('profenity is not allowed')
        }
        io.to('usa').emit('messageUpdated', generateMessage(message))
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('messageUpdated', generateMessage('A user has left'))
    })

    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?=${coords.latitude}${coords.longitude}`))
        callback()
    })
})

server.listen(port, () => {
    console.log('server is running on port ' + port)
})