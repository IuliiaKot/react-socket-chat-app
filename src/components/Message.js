import React from 'react';


const Message = (props) => {
  debugger
  let classUser = props.message.from === 'Admin' ? 'admin' : 'user'
  return(
    <li className={classUser}>
      {props.message.text}
      <span>{props.message.time}</span></li>
  )
}

export default Message;
