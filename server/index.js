
import express from 'express';
import http from 'http';
import webpack from 'webpack';
import socketIO from 'socket.io';
import Users from './utils/users';
let  messageModel = require('./model/message');
import {saveMessage} from './utils/messages';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

let users = new Users();


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


const loadMessages = (currentRoom, channel) => {
  messageModel.message.find({room: currentRoom}).limit(10).sort({_id: -1}).exec(function (err, results) {
        results.reverse();
        results.forEach(function (message) {
            channel.emit('message', {from: message.author, text: message.message, time: message.data});
        });
    });
}

io.on('connection', (socket) => {
  let curretTime = new Date().toLocaleString();
  console.log('new User connected');

  socket.on('join', (params, callback) => {
    console.log('user name is', params)
    if (params === undefined) {
      callback('error');
    }


    socket.username = params.userName;
    users.addUser(socket.id, params.userName, 'general');

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

    io.to('general').emit('updateUserList', users.findUsersForRoom(socket.room))
    loadMessages(socket.room, socket.broadcast.to(socket.room));
    callback();
  })

  socket.on('changeRoom', (room) => {
    users.removeUser(socket.username);
    io.to(socket.room).emit('updateUserList', users.findUsersForRoom(socket.room));
    socket.leave(socket.room);

    socket.emit('message', {
      from: "Admin",
      text: `you have connected to ${room}`,
      time: curretTime
    });

    socket.broadcast.to(socket.room).emit('message', {
      from: "Admin",
      text: `${socket.username} has left this room`,
      time: curretTime
    });

    users.addUser(socket.id, socket.username, room);

    socket.join(room);
    socket.room = room;
    io.to(socket.room).emit('updateUserList', users.findUsersForRoom(socket.room));

    loadMessages(socket.room, socket.broadcast.to(socket.room));
    socket.broadcast.to(socket.room).emit('message',{
      from: "Admin",
      text: `${socket.username} has joined ${room} room`,
      time: curretTime
    });

  })


  socket.on('createMessage', (message) => {
    console.log(curretTime)
    saveMessage(socket.room, message.text, message.from, curretTime);
    io.sockets.in(socket.room).emit('message', {
      from: message.from,
      text: message.text,
      time: curretTime
    });
  });


  socket.on('disconnect', ()=> {
    console.log('user was disconnected');
    users.removeUser(socket.username);
    io.to('general').emit('updateUserList', users.users);
    socket.broadcast.to('general').emit('message',{
      from: "Admin",
      text: `${socket.username}  has disconnected`,
      time: curretTime
    })

  });
});


server.listen(port);
