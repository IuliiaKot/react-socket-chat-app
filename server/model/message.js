// import mongoose from 'mongoose';
// mongoose.Promise = require('bluebird');

// let uristring = "mongodb://localhost/testchat";
// mongoose.createConnection(uristring);

// let messageSchema = mongoose.Schema({
//     room: String,
//     message: String,
//     author: String,
//     date: String
// })

// let Message = mongoose.model('messages', messageSchema);

// // exports.message = Message;

// export default Message;

let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

let uristring = process.env.MONGODB_URI || "mongodb://localhost/testchat";
mongoose.connect(uristring);

let messageSchema = mongoose.Schema({
    room: String,
    message: String,
    author: String,
    date: String
})

var Message = mongoose.model('messages', messageSchema);

exports.message = Message;