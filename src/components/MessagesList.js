import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';
import PropTypes from 'prop-types';

class MessagesList extends Component {
  scrollToBottom() {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
  render(){
  return (
      <div className="chat">
        <div class="chat-history panel-body body-panel">
          <ul className="chat-ul">
            {
              this.props.messages.map( (message,idx) => {
                return <Message message={message} key={idx}/>;
              })
            }
          </ul>
        </div>
        <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }} />
      </div>
  );
  };
};

MessagesList.propTypes = {
  messages: React.PropTypes.array
};

export default MessagesList;
