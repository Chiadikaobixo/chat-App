const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))


const port = process.env.PORT || 3000

let message = 'Welcome to XO chat application'

io.on('connection', (socket) => {
    console.log('New webSocket connection')

    socket.emit('messageUpdated', message)
    socket.broadcast.emit('messageUpdated', 'A new user has joined')

    socket.on('sendMessage', (message, callback) => {
        io.emit('messageUpdated', message)
        callback('Delivered!')
    })

    socket.on('disconnect', () => {
        io.emit('messageUpdated', 'A user has left')
    })

    socket.on('sendLocation', (coords) => {
        io.emit('messageUpdated', `https://google.com/maps?=${coords.latitude}${coords.longitude}`)
    })
})

server.listen(port, () => {
    console.log('server is running on port ' + port)
})