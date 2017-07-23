import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import MessagesList from './components/MessagesList';
import MessageForm from './components/MessageForm';
import Rooms from './components/Rooms';
import './styles/Style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import LoginPage from './components/LoginPage';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      messages: [],
      userMessage: '',
      displaUserLogin: true
    }
    // this.socket = io(`http://localhost:3000`)
    this.handleChange = this.handleChange.bind(this);
    this.userInput = this.userInput.bind(this);
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
  userInput(e){
    let userName = e.target.value;
    if (userName && e.which == 13) {
      this.setState({displaUserLogin: false})
      this.socket.emit('addUser', {userName: userName})
    }
  }

  render(){
    return(
      <div>
      {
        this.state.displaUserLogin ?
          <LoginPage userHandler={this.userInput}/>
          :
          <div className="container">
            <div>
              <div className="col-md-3"><Rooms/></div>
              <div className="col-md-9">
              {/* <form id="form" onSubmit={this.handleSubmit.bind(this)}> 
                <inout size="lg" type="text" name="message" placeholder="with a placeholder" 
                  value={this.state.userMessage}
                  onChange={this.handleChange}/>
              </form>   */}


              <form id="form"c lassName="form-inline" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group mx-sm-9">
                  <label for="inputPassword2" className="sr-only">Password</label>
                  <input type="text" className="form-control" id="inputPassword2" placeholder="Message"
                  value={this.state.userMessage}
                  onChange={this.handleChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Confirm identity</button>
              </form>  
                <MessagesList messages={this.state.messages}/>
              </div>
            </div> 
          </div>
      }
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
