const socket = io()

socket.on('messageUpdated', (message) => {
    console.log(message)
})

document.querySelector('#messageid').addEventListener('submit', (e) => {
    e.preventDefault()

    const message = e.target.elements.inputMessage.value
    socket.emit('messageid', message)
})