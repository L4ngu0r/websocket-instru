const socket = new WebSocket('ws://<ip>:9000/instru')

socket.addEventListener('open', (event) => {
  console.info('[instru] Connection opened')
})

let messages = []
const log = console.log.bind(console)
console.log = (...args) => {
  if (socket.readyState === 1) {
    messages.forEach((message) => {
      socket.send(JSON.stringify(message))
    })
    messages = []

    socket.send(JSON.stringify({ ...args }))
  } else {
    messages.push({ ...args })
  }

  log(...args)
}
