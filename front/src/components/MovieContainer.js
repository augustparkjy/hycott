import React from "react";
import axios from "axios";
import '../index.css'
import Movie from './Movie.js'

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
    )
    this.setState({movies, isLoading: false})
    // .then(()=>{
    //   this.setState({movies, isLoading: false})
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
            {movies.map( movie => (
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
// const mapDispatchProps = (dispatch) => {
//   return {
//     setPlayContents : (playContents)=> {dispatch(setPlayContents(playContents))}
//   }
// }
// MovieContainer = connect(mapDispatchProps)(MovieContainer);

export default MovieContainer;