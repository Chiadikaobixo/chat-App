const socket = io()

//Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormButton = $messageForm.querySelector('button')
const $messageFormInput = $messageForm.querySelector('input')
const $locationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

//Templates
const $messageTemplate = document.querySelector('#message-template').innerHTML
const $locationTemplate = document.querySelector('#location-template').innerHTML

//Options
const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix: true})

socket.on('messageUpdated', (message) => {
    console.log(message)
    const html = Mustache.render($messageTemplate, {
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html) 
})

socket.on('locationMessage', (messageUrl) => {
    console.log(messageUrl)
    const html = Mustache.render($locationTemplate, {
        url: messageUrl.url,
        createdAt: moment(messageUrl.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    $messageFormButton.setAttribute('disabled', 'disabled')

    const message = e.target.elements.inputMessage.value

    socket.emit('sendMessage', message, (error) => {
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()
        if (error) {
            return console.log(error)
        }
        console.log('message delivered')
    })
})

$locationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported in your browser')
    } else {
        $locationButton.setAttribute('disabled', 'disabled')
        navigator.geolocation.getCurrentPosition((position) => {
            socket.emit('sendLocation', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }, () => {
                console.log('location shared')
                $locationButton.removeAttribute('disabled')
            })
        })
    }
})

socket.emit('join', {username, room})