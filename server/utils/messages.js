let  messageModel = require('../model/message');

export const saveMessage = (room, message, username, time) => {
  console.log('time when saving', time);
  messageModel.message.create({
    room: room,
    message: message,
    author: username,
    createdAt: time
  }, (err, rs) => {
    console.log(err);
  });
}

// export const loadMessages = (curretRoom, channel) =>{
//   return messageModel.message.find({room: curretRoom}).sort({_id: -1})
// }