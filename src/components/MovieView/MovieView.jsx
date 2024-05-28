import React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Container, Col } from "react-bootstrap";

import './MovieView.scss';
import { MovieHero } from './MovieViewSections/MovieHero/MovieHero';
import { MovieDescription } from './MovieViewSections/MovieDescription/MovieDescription';
import { MovieDirector } from './MovieViewSections/MovieDirector/MovieDirector';

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find(movie => movie.id === movieId);
  const navigate = useNavigate();
  const location = useLocation();

  if (!movie) {
    return <div>Movie not found</div>;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    navigate(location.pathname, { replace: true });
  }, [movieId]);

  return (
    <>
      <MovieHero movie={movie} />
      <div style={{ boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)' }}>
        <Container>
          <Col sm={12} md={8} className="pt-5">
            <MovieDescription movie={movie} />
            <MovieDirector movie={movie} />
          </Col>
        </Container>
      </div>
    </>
  );
};     

MovieView.propTypes = { 
  movies: PropTypes.arrayOf(
    PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    titleOriginal: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    countries: PropTypes.arrayOf(PropTypes.string).isRequired,
    genre: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
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
    })
  ).isRequired,
};