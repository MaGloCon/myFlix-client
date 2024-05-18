import PropTypes from 'prop-types';

export const MovieCard =({movie, onMovieClick}) => {
  return(
    <div
    onClick={() =>{
      onMovieClick(movie);
    }}
    >
      {movie.title}
    </div>
  );
};


MovieCard.propTypes = { 
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    countries: PropTypes.arrayOf(PropTypes.string).isRequired,
    genre: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ).isRequired,
    director: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ).isRequired,
    actors: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};

