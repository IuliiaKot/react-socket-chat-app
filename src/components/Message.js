import React from 'react';


const Message = (props) => {
  let classUser = props.message.from === 'Admin' ? 'admin clearfix' : 'user clearfix'
  let message = classUser === 'admin' ? 
    <li className={classUser}>
       {props.message.text}
        <span>{props.message.time}</span>
    </li> :

      <li className={classUser}>
        <div className="message">
          <aside className="left username">
          User
          </aside>
          <aside className="right user-message">{props.message.text}</aside>
          <span className="time">{props.message.time}</span>
        </div>
      </li>
  return(
    <span>{message}</span>
  )
}

export default Message;
