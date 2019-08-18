import React from 'react';
import SignInBox from './SignIn';
import SignUpBox from './SignUp';

class SignBox extends React.Component {
    state ={
        isSignInOpen: true,
        isSignUpOpen: false
    }

    showSignInBox(){
        this.setState({isSignInOpen: true, isSignUpOpen: false})
    }

    showSignUpBox(){
        this.setState({isSignUpOpen: true, isSignInOpen: false})
    }

    render(){
        return(
            <div>
                <div className="box-container">
                    <div className={"controller " + (this.state.isSignInOpen
                        ? "selected-controller"
                        : "")}
                        onClick={                       
                        this.showSignInBox
                        .bind(this)}>
                        Sign In
                    </div>
                    <div
                        className={"controller " + (this.state.isSignUpOpen
                        ? "selected-controller"
                        : "")}
                        onClick={
                        this.showSignUpBox
                        .bind(this)}>
                        Sign Up
                    </div>
                </div>
                <div className = "box-container">
                    {this.state.isSignInOpen && <SignInBox/>}
                    {this.state.isSignUpOpen && <SignUpBox/>}
                </div>  
            </div>   
        )
    }
}

export default SignBox;