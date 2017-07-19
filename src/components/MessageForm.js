import React, {Component} from 'react';

class MessageForm extends Component {
    render(){
        return (
            <div>
                <input type="text" onKeyPress={this.handleSubmit.bind(this)}/>
                <button>Submit</button>
            </div>
        )
    }
}