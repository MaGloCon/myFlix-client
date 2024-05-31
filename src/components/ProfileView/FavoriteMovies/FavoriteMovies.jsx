import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Button, Card } from 'react-bootstrap';
import { DeleteFavoriteButton } from '../../FavoriteButtons/DeleteFavoriteButton';

import './FavoriteMovies.scss';

export const FavoriteMovies = ({ movie, user, token }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <>
      <div 
        className={`movie-card-wrapper ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      > 
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Card 
            className="movie-card shadow">
            <Card.Img className="movie-image" variant="link" src={movie.image} />
            <div className="shadow-gradient"></div>
            <Card.Body className="movie-body bg-transparent text-left text-uppercase">
              <Card.Title className="movie-title ">{movie.title}</Card.Title> 
              <Card.Text className="card-text">{movie.director && movie.director.length > 0 ? `${movie.director[0].Name}, ${movie.year}` : movie.year}</Card.Text>
            </Card.Body>
          </Card>
        </Link>
        {isHovered && (
          <Card className={`hovered-movie-card top-0 ${isHovered ? 'show' : 'hide'}`}>
            <Card.Body className="hovered-body bg-white shadow pt-1">
              <div className="d-flex justify-content-between">
                <DeleteFavoriteButton
                  user={user} 
                  token={token} 
                  movie={movie} 
                />
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                  <Button 
                    variant="dark"
                    className="more-button">
                    More
                  </Button> 
                </Link>
              </div>
            </Card.Body>
          </Card>
        )}
      </div>
    </>
  );
};

FavoriteMovies.propTypes = { 
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    countries: PropTypes.arrayOf(PropTypes.string).isRequired,
    genre: PropTypes.arrayOf(
      PropTypes.shape({
        navigatorame: PropTypes.string,
        description: PropTypes.string,
      })
    ).isRequired,
    director: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        bio: PropTypes.string,
        birth: PropTypes.string,
        death: PropTypes.string,
      })
    ).isRequired,
    actors: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};