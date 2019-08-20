import React, {Component} from 'react';
import '../App.css';
import TopBar from '../components/HideAppBar';
import SignBox from './SignScreen';
import {connect} from 'react-redux';
import {setModalOpen} from '../actions';
import MovieContainer from '../components/MovieContainer';

class MainScreen extends Component {
  state = {
    isTokenOn: false
  }
  render(){
    return (
      <div className="main">
          {this.props.modalOpen ? (<SignBox/>):""} 
            <div className="top-container"><TopBar/></div>
              <div className="main-container">
                <div><MovieContainer/></div>
                <div className="side-container"></div>
                <div className="contents-container"></div> {/*user={this.props.user}*/}
              </div>
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
