
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
  let curretTime = new Date().toLocaleString();
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

    socket.room = 'general'
    socket.join('general');

    socket.emit('message', {
      from: 'Admin',
      text: "Welcome to chat",
      time: curretTime
    });

    socket.broadcast.to('general').emit('message',{
      from: "Admin",
      text: `${params.userName} has joined general room`,
      time: curretTime
    });
    io.to('general').emit('updateUserList', findUsersForRoom(socket.room))

    callback();
  })

  socket.on('changeRoom', (room) => {
    removeUser(socket.username);
    console.log(findUsersForRoom(socket.room));
    let tmp = findUsersForRoom(socket.room);
    io.to(socket.room).emit('updateUserList', tmp);
    socket.leave(socket.room);

    let user = {username: socket.username, room: room, id: socket.id}
    usernames.push(user);

    socket.join(room);
    socket.room = room;
    io.to(socket.room).emit('updateUserList', findUsersForRoom(socket.room));

    socket.broadcast.to(socket.room).emit('message',{
      from: "Admin",
      text: `${socket.username} has joined ${room} room`,
      time: curretTime
    });

  })

  socket.on('createMessage', (message) => {
    console.log(message);
    io.emit('message', {
      from: message.from,
      text: message.text,
      time: curretTime
    });
  });

  socket.on('disconnect', ()=> {
    console.log('user was disconnected');
    removeUser(socket.username);
    io.to('general').emit('updateUserList', usernames);
    socket.broadcast.to('general').emit('message',{
      from: "Admin",
      text: `${socket.username}  has disconnected`,
      time: curretTime
    })

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

const findUsersForRoom = (room) => {
  return usernames.filter(userObj => userObj.room === room)
}
server.listen(port);
