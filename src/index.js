import React from 'react';
import ReactDOM from 'react-dom';
// import io from 'socket.io-client';
import MessagesList from './components/MessagesList';
// import MessageForm from './components/MessageForm';
import Rooms from './components/Rooms';
import UsersList from './components/UsersList';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/Style.css';

import LoginPage from './components/LoginPage';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      messages: [],
      userMessage: '',
      displaUserLogin: true,
      users: []
    }
    // this.socket = io(`http://localhost:3000`)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.userInput = this.userInput.bind(this);
  }

  componentDidMount(){
      // socket = io();

      socket.on('message', message => {
        console.log(message);
        this.setState({
          messages: [...this.state.messages, message]
        })
      })

      socket.on('updateUserList', (usernames) => {
        console.log(usernames);
        this.setState({users: usernames});
      })

  }

  handleChange(e){
    this.setState({userMessage: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault();
    let message ={from: "Julia", text: this.state.userMessage}
    socket.emit('createMessage', message)
    this.setState({userMessage: ''})
  }
  userInput(e){
    let userName = e.target.value;
    if (userName && e.which == 13) {
      this.setState({displaUserLogin: false})
        socket.emit('join', {userName: userName}, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('no error');
        }
    })
  }
}

  render(){
    return(
      <div>
      {
        this.state.displaUserLogin ?
          <LoginPage userHandler={this.userInput}/>
          :
          <div className="">
            <div className='row'>
              <div className="col-md-3"><Rooms/><UsersList users={this.state.users}/></div>
              <div className="col-md-9">

              <form id="form" className="form-inline" onSubmit={this.handleSubmit}>
                <div className="form-group mx-sm-9">
                  <label htmlFor="inputPassword2" className="sr-only">Password</label>
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
