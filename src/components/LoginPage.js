import React from 'react';



const LoginPage = (props) => {
    return (
        <div className="pages">
          <div className="login page">
            <div className="form">
              <h3 className="title">What's your nickname?</h3>
              <input className="usernameInput" type="text" maxLength="14" 
              onKeyPress={(e) => {props.userHandler(e)}}/>
            </div>
          </div>
        </div> 
    )
}


export default LoginPage;