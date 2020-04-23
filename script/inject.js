const socket = new WebSocket('ws://192.168.1.19:9000/instru')

let messages = []
let errors = []
socket.addEventListener('open', (event) => {
  console.info('[instru] Connection opened')
  socket.send(JSON.stringify({
    type: 'info',
    content: '--## New session ##--'
  }))
})

const log = console.log.bind(console)
const error = console.error.bind(console)

console.error = (...args) => {
  if (socket.readyState === 1) {
    errors.forEach((error) => {
      socket.send(JSON.stringify({
        type: 'error',
        content: error
      }))
    })
    errors = []

    socket.send(JSON.stringify({
      type: 'error',
      content: { ...args }[0].message // message or stack
    }))
  } else {
    errors.push({ ...args }[0].message)
  }
  error(...args)
}

console.log = (...args) => {
  if (socket.readyState === 1) {
    messages.forEach((message) => {
      socket.send(JSON.stringify({
        type: 'info',
        content: message
      }))
    })
    messages = []

    socket.send(JSON.stringify({
      type: 'info',
      content: { ...args }
    }))
  } else {
    messages.push({ ...args })
  }

  log(...args)
}
