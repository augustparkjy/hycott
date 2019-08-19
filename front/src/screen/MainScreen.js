import React, {Component} from 'react';
import '../App.css';
import TopBar from '../components/HideAppBar';
import SignBox from './SignScreen';
import {connect} from 'react-redux';
import {setModalOpen} from '../actions';

class MainScreen extends Component {
  state = {
    isTokenOn: false,
    // modalOn: false
  }
  // componentDidMount(){
  //   console.log(this.props.modalOpen)
  //   if(this.props.modalOpen===true)
  //     this.setState({
  //       modalOpen: true
  //     })
  // }
  render(){
    return (
      <div className="main">
        {
          this.props.modalOpen ? <div><SignBox/></div>
          :<div>
            <div className="top-container"><TopBar/></div>
              <div className="main-container">
                <div className="side-container"></div>
                <div className="contents-container"></div> {/*user={this.props.user}*/}
              </div>
          </div>
        }
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
      user: state.user,
      modalOpen : state.modalOpen
  };
}

const mapDispatchProps = (dispatch) => {
  return {
    setModalOpen : (modalOpen) => { dispatch(setModalOpen(modalOpen)) }
  }
}

MainScreen = connect(mapStateToProps,mapDispatchProps)(MainScreen);
export default MainScreen;
