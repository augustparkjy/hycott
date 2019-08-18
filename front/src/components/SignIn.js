import React from 'react';

class SignInBox extends React.Component {

    constructor(props) {
      super(props);
      this.state = {};
    }
  
    submitLogin(e) {}
  
    render() {
      return (
        <div className="inner-container">
          <div className="header">
            Sign In
          </div>
          <div className="box">
  
            <div className="input-group">
              <label htmlFor="username">email</label>
              <input
                type="text"
                name="email"
                className="login-input"
                placeholder="email"/>
            </div>
  
            <div className="input-group">
              <label htmlFor="password">password</label>
              <input
                type="password"
                name="password"
                className="login-input"
                placeholder="password"/>
            </div>
  
            <button
              type="button"
              className="login-btn"
              onClick={this
              .submitLogin
              .bind(this)}>Sign In</button>
          </div>
        </div>
      );
    }
  }

export default SignInBox;