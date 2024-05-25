import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

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
          <Card.Body className="movie-body bg-transparent text-left text-uppercase">
            <Card.Title className="movie-title ">{movie.title}</Card.Title> 
            <Card.Text className="card-text">{movie.director && movie.director.length > 0 ? `${movie.director[0].Name}, ${movie.year}` : movie.year}</Card.Text>
          </Card.Body>
      </Card>

      {isHovered && (
        <Card className={`hovered-movie-card top-0 ${isHovered ? 'show' : 'hide'}`}>
        <Card.Body className="hovered-body bg-white shadow pt-1">
          <div className="d-flex justify-content-between">
            <Button variant="btn btn-primary" onClick={() => {onMovieClick(movie)}}>More</Button> 
              <FontAwesomeIcon icon={faPlusCircle} size="2x"/>
          </div>
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

