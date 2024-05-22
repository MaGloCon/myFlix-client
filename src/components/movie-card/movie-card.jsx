import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import './movie-card.scss';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Button onClick={() => onMovieClick(movie)} className="movie-button bg-transparent border-0 p-2">
      <Card className="movie-card position-relative border-0 p-0" >
        <Card.Img className="movie-image shadow-gradient" variant="link" src={movie.image} />
        <div className="shadow-gradient position-absolute w-100 h-100"></div>
        <Card.Body className="movie-body position-absolute bottom-0 bg-transparent text-white text-left" >
          <Card.Title className="pb-0 mb-0">{movie.title}</Card.Title>
          <Card.Text>{movie.director && movie.director.length > 0 ? `${movie.director[0].Name}, ${movie.year}` : movie.year}</Card.Text>
        </Card.Body>
      </Card>
    </Button>
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
        Name: PropTypes.string,
        Description: PropTypes.string,
      })
    ).isRequired,
    director: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        Name: PropTypes.string,
        Bio: PropTypes.string,
        Birth: PropTypes.string,
        Death: PropTypes.string,
      })
    ).isRequired,
    actors: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};

