import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
// let socket = io(`http://localhost:3000`)

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
      <div>

          <input type="text" onKeyPress={this.handleSubmit.bind(this)}/>
          <button>Submit</button>
        {
          this.state.messages.map(message => {
            return <ul>{message.text}</ul>
          })
        }
       </div>

    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
