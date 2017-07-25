import React from 'react';
import Message from './Message';


const MessagesList = (props) => {
  return (
    
          <ul className="chat-ul">
            {
              props.messages.map( (message,idx) => {
                return <Message message={message} key={idx}/>
              })
            }
          </ul>
     
  )
}

export default MessagesList;
