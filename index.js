const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config.js');

var port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app) ;
const io = socketIO(server);

app.use(express.static(__dirname + '/public'))
app.use(webpackDevMiddleware(webpack(webpackConfig)))
app.use(bodyParser.urlencoded({extended: false}))



io.on('connection', (socket) => {
  console.log('new User connected')

  socket.emit('message', {
    from: 'Admin',
    text: "Welcome to chat",
    time: new Date().getTime()
  })

  socket.broadcast.emit('message',{
    from: "Admin",
    text: "New user was joined",
    time: new Date().getTime()
  })

  socket.on('createMessage', (message) => {
    console.log(message)
    io.emit('message', {
      from: message.from,
      text: message.text,
      time: new Date().getTime()
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
server.listen(port)
