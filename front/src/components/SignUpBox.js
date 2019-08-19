import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import config from '../config/config';
import axios from 'axios';
import { connect } from 'react-redux';
import {setModalOpen} from '../actions';

class SignUpBox extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          user: {
              email: '',
              pw:'',
              name: '',
              age: ''
          },
          pw2: '',
          checkEmail: false,
          isValidEmail: false,
          isValidPw: true
      };
    }

    _inputChange = item => async(event) => {
        if (item === 'email'){
          if ([item] !== event.target.value)
            this.setState({isValidEmail : false, checkEmail : false})
        }
        if (item === 'pw2'){
          await this.setState({[item]: event.target.value})
        } else {
          await this.setState({
            user:{
              ...this.state.user,
              [item]: event.target.value
            }
          });
        }
        //비밀번호 확인
        if(this.state.pw2 === this.state.user.pw){
          this.setState({isValidPw : true});
        } else {
          this.setState({isValidPw : false});
        }
      }
    
    _checkEmail = async()=>{
        if(this.state.user.email === '') 
          {
            alert('input email') 
            return;
          }
        this.setState({checkEmail : true});
        await axios.post(`${config.serverURI}/auth/check/email`, {
          email : this.state.user.email
        }).then(async(res) => {
          if(res.data.count === 0) await this.setState({isValidEmail : true});
        }).catch(err => {
          console.log("server err : ", err.response);
        })
      }
    
      _submit = async(e) => {
        if(this.state.user.email==='' || this.state.user.name==='' ||this.state.user.pw===''||this.state.pw2===''||this.state.age){
          alert('Fill in all blank');
          return;
        }
        if(!this.state.isValidEmail){
          alert('Check Email');
          return;
        }
        if(!this.state.isValidPw){
          alert('Check password');
          return;
        }
        e.preventDefault();

        //서버를 통해서 sequelize로 디비에 추가 & openstack 계정 생성
        axios.post(`${config.serverURI}/auth/signup`, this.state.user)
        .then((res) => {
          this.setState({
            user : {
              name: '',
              email: '',
              pw: '',
              age: ''
            },
            pw2: '',
            isValidPw : true,
          });
          // 부모가 props로 함수를 보내준 다음 자식은 이 함수를 사용해서 부모의 데이터 update
          // 자식컴포넌트가 부모컴포넌트로 직접적으로 변경이 불가능하기 떄문에 함수 사용
        })
        .then(()=>{
          alert("Done! Sign In Now!")
        })
        .then(()=>{
          this.props.setModalOpen(false);
        })
        .catch(err => {
          alert("Server error");
        });
      }
  
    render() {
      return (
        <div className="inner-container">
            <div className="header">Sign Up</div>
            <form style={{margin: "0px", width: "30%"}}>
                <div className="input-group" style={{margin: "0px", width: "100%"}}>
                    <TextField
                        fullWidth={true}
                        label="email"
                        type="email"
                        margin="normal"
                        variant="outlined"
                        required={true}
                        onChange={this._inputChange('email')}
                        className="signUp-input"
                        placeholder="email"/>
                      <Button variant="contained" onClick={this._checkEmail} style={{margin: "0 0 0 16px", height: "100%"}}>Check</Button>
                      {
                          this.state.checkEmail?
                              this.state.isValidEmail?
                                  <p style={{color : "blue", fontSize: "14px"}}>OK</p>
                                  : <p style={{color : "red", fontSize: "14px"}}>Existing email</p>
                              :<div/>
                      }                    
                    <TextField 
                      fullWidth={true}
                      label="비밀번호"
                      type="password"
                      margin="normal"
                      variant="outlined"
                      className="signUp-input"
                      placeholder="password"
                      onChange={this._inputChange('pw')}/>
                    <TextField 
                        fullWidth={true}
                        label="비밀번호"
                        type="password"
                        margin="normal"
                        variant="outlined"
                        className="signUp-input"
                        placeholder="password again"
                        onChange={this._inputChange('pw2')}/>
                    { this.state.pw2 !=='' ?
                        this.state.isValidPw ? 
                            <p style={{color : "blue", fontSize: "14px"}}>OK</p>
                            : <p style={{color : "red", fontSize: "14px"}}>INCORRECT</p>
                        :<div/>
                    }
                    <TextField
                        fullWidth={true}
                        label="name"
                        type="text"
                        margin="normal"
                        variant="outlined"
                        onChange={this._inputChange('name')}
                        className="signUp-input"
                        placeholder="name"/>
                    <TextField
                        fullWidth={true}
                        label="age"
                        type="text"
                        margin="normal"
                        variant="outlined"
                        onChange={this._inputChange('age')}
                        className="signUp-input"
                        placeholder="age"/>
                    <Button className="signUp-btn" onClick={this._submit.bind(this)}>Sign Up</Button>
                </div>
            </form>
        </div>                
      );
    }
  }

  const mapDispatchProps = (dispatch) => {
    return {
      setModalOpen : (modalOpen) => { dispatch(setModalOpen(modalOpen)) }
    }
  }
  
  const mapStateToProps = (state) => {
    return {
        modalOpen : state.modalOpen
    }
  }
SignUpBox = connect(mapStateToProps, mapDispatchProps)(SignUpBox); 
export default SignUpBox;