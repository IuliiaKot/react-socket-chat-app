import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import MessagesList from './components/MessagesList';
import MessageForm from './components/MessageForm';
import Rooms from './components/Rooms';
import 'bootstrap/dist/css/bootstrap.css';
import './Style.css';
import { Container, Row, Col } from 'reactstrap';
import { Button, Input, FormText , Form} from 'reactstrap';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      messages: [],
      userMessage: '',
      hideLogin: false
    }
    // this.socket = io(`http://localhost:3000`)
    this.handleChange = this.handleChange.bind(this);
    this.joinToChat = this.joinToChat.bind(this);
  }

  componentDidMount(){
      this.socket = io();

      this.socket.on('message', message => {
        console.log(message)
        this.setState({
          messages: [...this.state.messages, message]
        })
      })
  }

  handleChange(e){
    this.setState({userMessage: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault();
    let message ={from: "Julia", text: this.state.userMessage}
    this.socket.emit('createMessage', message)
    this.setState({userMessage: ''})
  }

  joinToChat(e){
    // debugger
    let test = document.getElementsByClassName('login')
    if (e.which === 13) {
        this.setState({hideLogin: true})
      //  this.socket.emit('createMessage', {name: "Adam", text:"welcome"})
    }
  }

  render(){
    return(
     
        <ul className="pages">
            <li className="chat page">
                <aside className='left'>
                    <div className='rooms-list'>
                      <h4>Rooms</h4>
                      <div className="list-group col-md-12" id="rooms">
                        <Rooms/>
                      </div>
                    </div>
                    <div className='users-list'>
                      <h4>Users</h4>
                      <div className="list-group col-md-12" id="users">
                      </div>
                    </div>

                </aside>
                <aside className='right'>
                  <div className="chat">
                    <div className="chat-history panel-body body-panel">
                      <ul className="chat-ul">
                      </ul>
                    </div>
                  </div>
                </aside>
                <div>
                <Form id="form" onSubmit={this.handleSubmit.bind(this)}> 
                <Input size="lg" type="text" name="message" placeholder="with a placeholder" 
                  value={this.state.userMessage}
                  onChange={this.handleChange}/>
              </Form> 
              <MessagesList messages={this.state.messages}/>
              </div> 
            </li>  
           {this.state.hideLogin ? null :   
          <li className="login page">
            <div className="form">
              <h3 className="title">What's your nickname?</h3>
              <input className="usernameInput" type="text" maxLength="14" onKeyPress={this.joinToChat}/>
            </div>
          </li>
           }
        </ul>    

    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
