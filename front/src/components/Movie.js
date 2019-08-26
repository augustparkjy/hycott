import React from "react";
import PropTypes from "prop-types";
import '../index.css'
import {connect} from 'react-redux';
import ButtonBase from '@material-ui/core/ButtonBase'
import { setPlayContents } from "../actions";
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class Movie extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      checkBoxOn: false,
      contentsInfo: {
        year: this.props.year,
        title: this.props.title,
        summary: this.props.summary,
        poster: this.props.poster,
        genre: this.props.genres,
        infohash: this.props.infohash[0].hash
      }
    }
  }
  
  _checkPlay = () => {
    this.setState({checkBoxOn: !this.state.checkBoxOn})
  }

  _playContents = () => {
    this.props.setPlayContents(this.state.contentsInfo.infohash)
    this._checkPlay();
  }

  render(){
    return(
      <div className="movie">
      <ButtonBase className="posterButton" onClick={()=>this._checkPlay()}>
        <img src={this.props.poster} alt={this.props.title} title={this.props.title}/>
      </ButtonBase>
      <div className="movie__data">
        <h3 className="movie__title">{this.props.title}</h3>
        <h5 className="movie__year">{this.props.year}</h5>
        <ul className="movie__genres"> 
          {this.props.genres.map((genre, index) => (
            <li key={index} className="genres__genre">
              {genre}
            </li>
          ))}
        </ul>
        <p className="movie__summary">{this.props.summary.slice(0, 100)}...</p>
      </div>
      <div className="main">
        {this.state.checkBoxOn===true ? (
        <Dialog
          open = {this.state.checkBoxOn}
          fullWidth = {false}
          aria-labelledby="alert-dialog-title" 
          aria-describedby="alert-dialog-description">
        <div className="movie">
          <img src={this.props.poster} alt={this.props.title} title={this.props.title}/>
          <div className="movie__data">
            <h3 className="movie__title">{this.props.title}</h3>
            <h5 className="movie__year">{this.props.year}</h5>
            <ul className="movie__genres"> 
              {this.props.genres.map((genre, index) => (
                <li key={index} className="genres__genre">
                  {genre}
                </li>
              ))}
            </ul>
            <p className="movie__summary">{this.props.summary.slice(0, 100)}...</p>
          </div>
          <Typography>PLAY THIS CONTENTS?</Typography>
          <div>
            <Button onClick={()=>this._playContents()}>YES</Button>
            <Button onClick={()=>this._checkPlay()}>NO</Button>
          </div>
        </div> 
      </Dialog>) : ""}
      </div>
    </div>
    )}
}
Movie.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  summary: PropTypes.string.isRequired
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
    setPlayContents : (playContents)=> { dispatch(setPlayContents(playContents)) }
}
}
Movie = connect(mapStateToProps, mapDispatchProps)(Movie);
export default Movie;