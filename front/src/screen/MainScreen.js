import React, {Component} from 'react';
import '../App.css';
import TopBar from '../components/HideAppBar';
import SignBox from './SignScreen';
import {connect} from 'react-redux';
import {setModalOpen, setPlayContents} from '../actions';
import MovieContainer from '../components/MovieContainer';
import PlayScreen from './PlayScreen';

class MainScreen extends Component {
  
  state = {
    screenOn: true
  }

  render(){
    // console.log(this.props.playContents)
    return (
      <div className="main">
          {this.props.modalOpen ? (<SignBox/>):""} 
            <div className="top-container"><TopBar/></div>
              <div className="main-container">
                <div><MovieContainer/></div>
                {this.props.playContents ? (<PlayScreen infohash="88594aaacbde40ef3e2510c47374ec0aa396c08e&dn=bbb_sunflower_1080p_30fps_normal.mp4&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80%2Fannounce&ws=http%3A%2F%2Fdistribution.bbb3d.renderfarming.net%2Fvideo%2Fmp4%2Fbbb_sunflower_1080p_30fps_normal.mp4"/>) : ""}
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
