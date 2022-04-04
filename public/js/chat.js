const socket = io()

socket.on('messageUpdated', (message) => {
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()

    const message = e.target.elements.inputMessage.value
    socket.emit('sendMessage', message, (message) => {
        console.log('message was delivered', message)
    })
})

document.querySelector('#send-location').addEventListener('click', () => {
    if(!navigator.geolocation){
    return alert('Geolocation is not supported in your browser')
    }else{
        navigator.geolocation.getCurrentPosition((position) => {
            socket.emit('sendLocation', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        })
    }
})