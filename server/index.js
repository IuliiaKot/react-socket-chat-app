
import express from 'express';
import http from 'http';
import webpack from 'webpack';
import socketIO from 'socket.io';

import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';


const port = 8000;
const app = express();
const server = http.createServer(app) ;
const io = socketIO(server);
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../public/index.html'));
});

let users = []

io.on('connection', (socket) => {
  console.log('new User connected')
  socket.on('addUser', (user) => {
    console.log(user)
  })

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
