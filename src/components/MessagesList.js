import React from 'react';
import Message from './Message';


const MessagesList = (props) => {
  return (
    <div>
      <ul>
        {
          props.messages.map( (message,idx) => {
            return <Message message={message} key={idx}/>
          })
        }
      </ul>
    </div>
  )
}

export default MessagesList;
