import React from 'react';
import SignInBox from '../components/SignInBox';
import SignUpBox from '../components/SignUpBox';
import Button from '@material-ui/core/Button';

class SignScreen extends React.Component {
    state ={
        selectedSignIn: true
    }

    _showSignInBox = () => {
        this.setState({selectedSignIn: true})
    }

    _showSignUpBox = () => {
        this.setState({selectedSignIn: false})
    }

    render(){
        return(
            <div className="root-container">
                <Button variant={this.state.selectedSignIn?"contained":"outlined"} color="primary" onClick={this._showSignInBox} className="flex-1" >Sign In</Button>
                <Button variant={!this.state.selectedSignIn?"contained":"outlined"} color="primary" onClick={this._showSignUpBox} className="flex-1" >Sign Up</Button>
                <div className="inner-container">
                    {this.state.selectedSignIn?<SignInBox/>:<SignUpBox/>}
                </div>
            </div>   
        )
    }
}

export default SignScreen;