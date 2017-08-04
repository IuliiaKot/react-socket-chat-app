import React from 'react';


const Message = (props) => {
  let classUser = props.message.from === 'Admin' ? 'admin' : 'user'
  return(
    <li className={classUser}>
      {props.message.text}
      <p>{props.message.time}</p>
    </li>
  )
}

export default Message;
