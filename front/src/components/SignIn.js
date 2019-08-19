import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import config from '../config/config';
import axios from 'axios';

class SignInBox extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        email: '',
        pw: ''
      };
    }
  
    _inputChange = item => async(event) => {
      await this.setState({
        ...this.state,
        [item]: event.target.value
      })
    }

    _signIn = async () => {
      if(this.state.email==='' || this.state.pw===''){
        alert('Fill in all blank');
        return;
      }
      // 로그인 성공시
        await axios.post(`${config.serverURI}/auth/signin`, {
        email : this.state.email,
        pw : this.state.pw 
      }).then((res) =>{
        if(res.status===200 && res.data.success){
              // web storage에 token 저장하면 자동로그인 가능
              // 유저 나이 이름 정보 받아오게
              let user = {
                email : this.state.email,
                pw : this.state.pw,
                token : res.data.token,
              }
              this.setState({ email : '',  pw: '' });
              // this.props.setUser(user);
              // this.props.setInitModalOpen(false);
              // localStorage.setItem('user', JSON.stringify(user));
        }}).catch(err => {
        if(err.response && err.response.status===401 && !err.response.data.success){
          alert('Cannot find that user');
          this.setState({ email: '', pw: '' });
        }
      })
    }
  
    render() {
      return (
        <div className="inner-container">
            <div className="header">Sign In</div>
            <form style={{margin: "0px", width: "30%"}}>
                <div className="input-group" style={{margin: "0px", width: "100%"}}>
                    <TextField
                        fullWidth={true}
                        label="email"
                        type="email"
                        margin="normal"
                        variant="outlined"
                        required={true}
                        className="signIn-input"
                        placeholder="email"
                        onChange={this._inputChange('email')}/>
                    <TextField 
                        fullWidth={true}
                        label="비밀번호"
                        type="password"
                        margin="normal"
                        variant="outlined"
                        className="signIn-input"
                        placeholder="password"
                        onChange={this._inputChange('pw')}/>
                    <Button className="signIn-btn" onClick={this._signIn.bind(this)}>Sign In</Button>
                </div>
            </form>
          </div>
        /*{ </div>
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
        </div> }*/
      );
    }
  }

export default SignInBox;