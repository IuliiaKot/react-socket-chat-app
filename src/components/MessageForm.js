import React, {Component} from 'react';

const MessageForm = (props) => {

    return (
        <div className="form-message">
            <form id="input-form" onSubmit={(e) => {props.submitForm(e)}}>
            <div className="row">
                <div className="col-md-11">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search for..."
                        value={props.userMessage}
                        onChange={(e) => {props.handleChange(e)}}
                        ref={input => input && input.focus()}/>
                    <span className="input-group-btn">
                    <button className="btn btn-primary" type="submit">Send</button>
                    </span>
                </div>
                </div>
            </div>
        </form>
        </div>
    )

}

export default MessageForm;