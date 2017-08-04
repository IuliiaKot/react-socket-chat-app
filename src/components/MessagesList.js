import React from 'react';
import Message from './Message';
import PropTypes from 'prop-types';

const MessagesList = (props) => {
  return (
      <div className="chat">
        <div class="chat-history panel-body body-panel">
          <ul className="chat-ul">
            {
              props.messages.map( (message,idx) => {
                return <Message message={message} key={idx}/>;
              })
            }
          </ul>
        </div>
        {        window.scrollBy(0, 1000)}
      </div>
  );
};

MessagesList.propTypes = {
  messages: React.PropTypes.array
};

export default MessagesList;
