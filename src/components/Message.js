import React from 'react';


const Message = (props) => {
  let classUser = props.message.from === 'Admin' ? 'admin clearfix' : 'user clearfix'
  let message = classUser === 'admin' ? 
    <li className={classUser}>
       {props.message.text}
        <span>{props.message.time}</span>
    </li> :

      <li className={classUser}>
          <aside className="left username">
            <spam id="username">{props.message.from}</spam>
          </aside>
          <aside className="right user-message">
            <p>{props.message.text}</p>
            <span className="time">{props.message.time}</span>
          </aside>
      </li>
  return(
    <span>{message}</span>
  )
}

export default Message;
