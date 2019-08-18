import React, {Component} from 'react';
import './App.css';
import TopBar from './components/TopBar'

class App extends Component {
  state = {
    isSignIn: false,
  }
  render(){
    return (
      <div className="App">
          <div className="top-container"><TopBar isSignIn={this.state.isSignIn}/></div>
          <div>
            <div className="side-container"></div>
            <div className="contents-container"></div>
          </div>
      </div>
    );
  }
}

export default App;
