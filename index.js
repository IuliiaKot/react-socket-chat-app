const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config.js');

const app = express();
const server = http.createServer(app) ;
const io = socketIO(server);

app.use(express.static(__dirname + '/public'))
app.use(webpackDevMiddleware(webpack(webpackConfig)))
app.use(bodyParser.urlencoded({extended: false}))

// app.post('/', (req, res) => {
//   const { Body, From, MediaUrl0 } = req.body
//   const message = {
//     body: Body,
//     from: From.slice(8),
//     img: MediaUrl0
//   }
//   io.emit('message', message)

// })

io.on('connection', (socket) => {
  console.log('new User connected')

  socket.emit('message', {
    from: 'Admin',
    text: "Welcome to chat"
  })

  socket.broadcast.emit('message',{
    from: "Admin",
    text: "New user was joined"
  })

  socket.on('createMessage', (message) => {
    console.log(message)
    io.emit('message', {
      from: message.from,
      text: message.text,
      created_at: new Date().getTime()
    })
    // socket.broadcast.emit('message', {
    //    from: message.from,
    //    text: message.text,
    //    created_at: new Date().getTime()
    // })
  })
})

io.on('disconnect', ()=>{
  console.log('user was disconnected');
})
server.listen(3000)
