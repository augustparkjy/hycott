import React, {Component} from 'react';
import '../App.css';
import TopBar from '../components/HideAppBar';
import SignBox from './SignScreen';
import {connect} from 'react-redux';
import {setModalOpen, setPlayContents} from '../actions';
import MovieContainer from '../components/MovieContainer';
import PlayScreen from './PlayScreen';
import NewWindow from 'react-new-window'
// import CheckPlayBox from '../compomnents/CheckPlayBox';

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
                {this.props.playContents ? (<PlayScreen infohash={this.props.playContents}/>) : ""}
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
      modalOpen : state.modalOpen,
      playContents : state.playContents
  };
}

const mapDispatchProps = (dispatch) => {
  return {
    setModalOpen : (modalOpen) => { dispatch(setModalOpen(modalOpen)) },
    setPlayContents : (playContents) => { dispatch(setPlayContents(playContents))}
  }
}

MainScreen = connect(mapStateToProps,mapDispatchProps)(MainScreen);
export default MainScreen;
