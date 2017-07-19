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
    if (e.which == 13) {
      this.setState({displaUserLogin: false})
    }
  }

  render(){
    return(
      <div>
      {
        this.state.displaUserLogin ?
          <span className="pages">
          <div className="login page">
            <div className="form">
              <h3 className="title">What's your nickname?</h3>
              <input className="usernameInput" type="text" maxLength="14" 
              onKeyPress={this.userInput}/>
            </div>
          </div>
        </span>   :

 
      <Container>
        <Row>
          <Col md="3"><Rooms/></Col>
          <Col md="9">
           <Form id="form" onSubmit={this.handleSubmit.bind(this)}> 
            <Input size="lg" type="text" name="message" placeholder="with a placeholder" 
              value={this.state.userMessage}
              onChange={this.handleChange}/>
           </Form>     
            <MessagesList messages={this.state.messages}/>
          </Col>
        </Row> 
      </Container>
     }
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
