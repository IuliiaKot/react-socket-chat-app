import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import MessagesList from './components/MessagesList';
import MessageForm from './components/MessageForm';
import Rooms from './components/Rooms';
import 'bootstrap/dist/css/bootstrap.css';
import './Style.css';
import { Container, Row, Col } from 'reactstrap';
import { Button, Input, FormText } from 'reactstrap';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      messages: []
    }
    // this.socket = io(`http://localhost:3000`)
  }

  componentDidMount(){
      this.socket = io();

      this.socket.on('message', message => {
        console.log(message)
        this.setState({
          messages: [message, ...this.state.messages]
        })
      })
  }
  handleSubmit(e){
    if (e.which == 13) {
      let message ={from: "Julia", text: e.target.value}
      // this.setState({messages: [message,...this.state.messages]});
      this.socket.emit('createMessage', message)
    }
  }
  render(){
    return(
      <Container>
        <Row>
          <Col md="3"><Rooms/></Col>
          <Col md="9">
            <Input type="text" name="email" placeholder="with a placeholder" 
                onKeyPress={this.handleSubmit.bind(this)}/>
            <MessagesList messages={this.state.messages}/>
          </Col>
        </Row>
      </Container>

    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
