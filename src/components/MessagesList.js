import React from 'react';
import Message from './Message';
import PropTypes from 'prop-types';

const MessagesList = (props) => {
  return (
      <ul className="chat-ul">
        {
          props.messages.map( (message,idx) => {
            return <Message message={message} key={idx}/>;
          })
        }
      </ul>
  );
};

MessagesList.propTypes = {
  messages: React.PropTypes.array
};

export default MessagesList;
