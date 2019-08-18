import React from 'react';

class SignUpBox extends React.Component {

    constructor(props) {
      super(props);
      this.state = {};
    }
  
    submitRegister(e) {}
  
    render() {
      return (
        <div className="inner-container">
          <div className="header">
            Sign Up
          </div>
          <div className="box">
  
            <div className="input-group">
              <label htmlFor="email">email</label>
              <input
                type="text"
                name="email"
                className="login-input"
                placeholder="email"/>
            </div>
  
            <div className="input-group">
              <label htmlFor="username">username</label>
              <input type="text" name="username" className="login-input" placeholder="username"/>
            </div>
  
            <div className="input-group">
              <label htmlFor="password">password</label>
              <input
                type="password"
                name="password"
                className="login-input"
                placeholder="Password"/>
            </div>
            <button
              type="button"
              className="login-btn"
              onClick={this
              .submitRegister
              .bind(this)}>Sign Up</button>
          </div>
        </div>
      );
    }
  }
export default SignUpBox;