import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { userPropType, tokenPropType, moviePropType } from '../../../utils/propTypes'
import { Link } from 'react-router-dom';
import { ToggleFavoriteButton1 } from '../FavoriteButtons/FavoriteButtons';
import { Button, Card } from 'react-bootstrap';

import './MovieCard.scss';

export const MovieCard = ({ movie, user, token, setUser }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div 
      className={`movie-card-wrapper ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
        <Card className="movie-card shadow">
          <Card.Img className="movie-image" variant="link" src={movie.image} />
          <div className="shadow-gradient">
          <Card.Body className="movie-body bg-transparent text-left text-uppercase">
            <Card.Title className="movie-title ">{movie.title}</Card.Title> 
            <Card.Text className="card-text">{movie.director && movie.director.length > 0 ? `${movie.director[0].Name}, ${movie.year}` : movie.year}</Card.Text>
          </Card.Body>
          </div>
        </Card>
      </Link>

      {isHovered && (
        <Card className={`hovered-movie-card top-0 ${isHovered ? 'show' : 'hide'}`}>
          <Card.Body className="hovered-body bg-white shadow pt-1">
            <div className="d-flex justify-content-between">
              <ToggleFavoriteButton1
                user={user} 
                token={token} 
                movie={movie} 
                setUser={setUser}
              />
              <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                <Button 
                  variant="dark"
                  className="more-button"
                  >
                  More
                </Button> 
              </Link>
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

MovieCard.propTypes = {
  movie: moviePropType,
  user: userPropType,
  token: tokenPropType,
  setUser: PropTypes.func.isRequired,
};