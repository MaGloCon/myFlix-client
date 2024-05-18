import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img height={300} src={movie.image} alt={movie.title}/>
      </div>
      <div>
        <span>Title: </span>
        {`${movie.title} ${movie.titleOriginal && movie.titleOriginal.length > 0 ? `(${movie.titleOriginal.join(', ')})` : ''}`}
      </div>
    
      <div>
        <span>Country: </span>
        <span>{movie.countries.join(', ')}</span>
      </div>
      <div>
        <span>Year: </span>
        <span>{movie.year}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre.map(g => g.Name).join(', ')}</span>
      </div>
       <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.map(d => d.Name).join(', ')}</span>
      </div>
      <div>
        <span>Actors: </span>
        <span>{movie.actors.join(', ')}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

MovieView.propTypes = { 
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    titleOriginal: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    countries: PropTypes.arrayOf(PropTypes.string).isRequired,
    genre: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
      })
    ).isRequired,
    director: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
      })
    ).isRequired,
    actors: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};