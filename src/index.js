const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

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

    socket.on('messageid', (message) => {
        io.emit('messageUpdated', message)
    })
})

server.listen(port, () => {
    console.log('server is running on port ' + port)
})