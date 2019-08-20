import React from 'react';
import SignInBox from '../components/SignInBox';
import SignUpBox from '../components/SignUpBox';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog'
import {connect} from 'react-redux'
import {setModalOpen} from '../actions'

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
    _closeBox = () => {
        this.props.setModalOpen(false)
    }

    render(){
        return(
            <Dialog 
            onClose={this._closeBox}
            open={this.props.modalOpen}
            fullWidth = {false}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
                <div className="root-container">
                    <Button variant={this.state.selectedSignIn?"contained":"outlined"} color="primary" onClick={this._showSignInBox} className="flex-1" >Sign In</Button>
                    <Button variant={!this.state.selectedSignIn?"contained":"outlined"} color="primary" onClick={this._showSignUpBox} className="flex-1" >Sign Up</Button>
                    <div className="inner-container">
                        {this.state.selectedSignIn?<SignInBox/>:<SignUpBox/>}
                    </div>
                </div>   
            </Dialog>
        )
    }
}
const mapStateToProps = (state) => {
return {
    modalOpen : state.modalOpen
};
}
  const mapDispatchProps = (dispatch) => {
return {
    setModalOpen : (modalOpen) => { dispatch(setModalOpen(modalOpen)) }
}
}
SignScreen = connect(mapStateToProps, mapDispatchProps)(SignScreen)
export default SignScreen;