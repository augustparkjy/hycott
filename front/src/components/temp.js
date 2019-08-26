//temporary file for upload component 
import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import '../index.css'
import {connect} from 'react-redux';
import ButtonBase from '@material-ui/core/ButtonBase'
import config from '../config/config'

//movie upload
function Movie({ year, title, summary, poster, genres, infohash, id }) {
  const requestService = async () => {
    await axios.post(`${config.serverURI}/service/newContents`, {
      id: id,
      genre: genres[0],
      year: year,
      summary: summary,
      poster: poster,
      infohash: infohash[0].hash,
      title: title
    })
    .then(()=>{
      console.log("movie info upload to db")
    })
    .catch(()=>{
      console.log("fail")
    })
  }
  return (
    <div className="movie">
      <ButtonBase className="posterButton" onClick={()=>requestService()}>
      <img src={poster} alt={title} title={title}/>
      </ButtonBase>
      <div className="movie__data">
        <h3 className="movie__title">{title}</h3>
        <h5 className="movie__year">{year}</h5>
        <ul className="movie__genres"> 
          {genres.map((genre, index) => (
            <li key={index} className="genres__genre">
              {genre}
            </li>
          ))}
        </ul>
        <p className="movie__summary">{summary.slice(0, 100)}...</p>
      </div>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  infohash: PropTypes.arrayOf(PropTypes.object).isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired
};

class MovieContainer extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };
  getMovies = async () => {
    const {
      data: {
        data: { movies }
      }
    } = await axios.get(
      "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
    );
    this.setState({ movies, isLoading: false });
    
    // axios.post(`${config.serverURI}/service/newContents`, {
    //   movies: this.state.movies
    //   }).then(()=>{
    //   console.log("good")
    // })
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map(movie => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
                infohash={movie.torrents}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      modalOpen : state.modalOpen
  };
}
MovieContainer = connect(mapStateToProps)(MovieContainer);
export default MovieContainer;