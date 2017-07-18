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


io.on('connection', (socket) => {
  console.log('new User connected')

  socket.emit('message', {
    to: "Julia",
    text: "Hello"
  })

  socket.on('createMessage', (message) => {
    console.log(message)
  })
})

io.on('disconnect', ()=>{
  console.log('user was disconnected');
})
server.listen(3000)
