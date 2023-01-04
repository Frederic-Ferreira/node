const messageList = document.getElementById('message-list')
const chatStatus = document.getElementById('chat-status')

let ws
function connect() {
  ws = new WebSocket('ws://localhost:3000/ws')
  ws.onopen = () => {
    console.log('Connected')
    ws.send('Hello from client')
    chatStatus.style.background = 'green'
  }

  ws.onerror = (error) => {
    console.log('Error', error)
  }

  ws.onclose = () => {
    console.log('disconnected')
    chatStatus.style.background = 'red'
    setTimeout(connect, 1000)
  }

  ws.onmessage = (event) => {
    console.log('message from server', event.data)
    const { type, data } = JSON.parse(event.data)
    if (type === 'reply') addMessage(data.user.name + ' : ' + data.msg)
  }
}

function addMessage(content) {
  const message = document.createElement('p')
  message.innerText = content
  messageList.append(message)
}

connect()

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()
  const input = document.querySelector('#chat-input')
  addMessage(input.value)
  ws.send(input.value)
  input.value = ''
})
