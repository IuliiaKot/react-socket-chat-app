
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

let usernames = [];
let rooms = ['general', 'nyc', 'sf', 'node'];

io.on('connection', (socket) => {
  console.log('new User connected');
  socket.on('addUser', (user) => {
    console.log(user);
  });


  socket.on('join', (params, callback) => {
    console.log('user name is', params)
    if (params === undefined) {
      callback('error');
    }


    socket.username = params.userName;
    let user = {username: params.userName, room: 'general', id: socket.id}
    usernames.push(user);


    socket.join('general');

    socket.emit('message', {
      from: 'Admin',
      text: "Welcome to chat",
      time: new Date().getTime()
    });

    socket.broadcast.to('general').emit('message',{
      from: "Admin",
      text: `${params.userName} has joined general room`,
      time: new Date().getTime()
    });

    io.to('general').emit('updateUserList', usernames)

    callback();
  })

  socket.on('createMessage', (message) => {
    console.log(message);
    io.emit('message', {
      from: message.from,
      text: message.text,
      time: new Date().getTime()
    });
  });

  socket.on('disconnect', ()=> {
    console.log('user was disconnected');
    removeUser(socket.username);
    console.log(usernames)
    io.to('general').emit('updateUserList', usernames);

  });
});


const getUser = (username) => {
  return usernames.filter(userObj => {return userObj.username == username})[0]
}

const removeUser = (username) => {
  console.log(username)
  let user = getUser(username);
  if (user) {
    usernames = usernames.filter(userObj => userObj.username != user.username)
  }
}
server.listen(port);
