import React from 'react';
import Message from './Message';


const MessagesList = (props) => {
  return (
    <aside className="right">
      <div className="chat">
        <div className="chat-history panel-body body-panel">
          <ul className="chat-ul">
            {
              props.messages.map( (message,idx) => {
                return <Message message={message} key={idx}/>
              })
            }
          </ul>
        </div>  
      </div>
    </aside>
  )
}

export default MessagesList;
