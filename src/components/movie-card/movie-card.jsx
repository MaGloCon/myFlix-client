import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import './movie-card.scss';

export const MovieCard = ({ movie, onMovieClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleClick = useCallback(() => onMovieClick(movie), [onMovieClick, movie]);

  return (
    <div 
      className={`movie-card-wrapper ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <Card className="movie-card shadow">
        <Card.Img className="movie-image" variant="link" src={movie.image} />
        <div className="shadow-gradient"></div>
          <Card.Body className="movie-body bg-transparent text-left">
            <Card.Title className="movie-title text-uppercase">{movie.title}</Card.Title> 
            {/* <Card.Text>{movie.director && movie.director.length > 0 ? `${movie.director[0].Name}, ${movie.year}` : movie.year}</Card.Text> */}
          </Card.Body>
      </Card>

      {isHovered && (
        <Card className={`hovered-movie-card top-0 ${isHovered ? 'show' : 'hide'}`}>
        <Card.Body className="hovered-body bg-white shadow">
          <div className="d-flex justify-content-between">
            <Button variant="secondary"> Add to favorite</Button>
            <Button variant="primary" onClick={() => {onMovieClick(movie)}}>More</Button> 
          </div>
          <Card.Text>
            {
              movie.director && movie.director.length > 0 
                  ? movie.director.map(director => director.Name).join(', ') 
                  : 'No Director Information'
            }
          </Card.Text>
          <Card.Text>{movie.year}</Card.Text>
        </Card.Body>
      </Card>
      )}
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

