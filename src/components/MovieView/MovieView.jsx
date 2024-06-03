import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Container, Col, Row } from "react-bootstrap";

import { moviePropType, userPropType, tokenPropType } from "../../../utils/propTypes";
import { MovieHero } from './MovieViewSections/MovieHero/MovieHero';
import { MovieDescription } from './MovieViewSections/MovieDescription/MovieDescription';
import { MovieDirector } from './MovieViewSections/MovieDirector/MovieDirector';

import './MovieView.scss';

export const MovieView = ({ movies, user, token, setUser }) => {
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
    <div className="movie-view mb-5">
      <MovieHero 
        movie={movie}
        user={user}
        token={token}
        setUser={setUser}
        />
      <div>
        <Container className="mt-5">
           <Row className="justify-content-center">
            <Col sm={12} md={12} lg={10}>
                <div className="d-lg-none mb-5">
                <MovieDescription movie={movie} />
                </div>
                <div>
                  <h2 className="text-uppercase p-2">Director</h2>
                  <div>
                    {movie.director.map((director, index) => (
                      <MovieDirector key={index} director={director} />
                    ))}
                  </div>
                </div>
            </Col>
          </Row>
       </Container>
      </div>
    </div>
  );
};     

MovieView.propTypes = { 
  movies: PropTypes.arrayOf(moviePropType).isRequired,
  user: userPropType,
  token: tokenPropType,
  setUser: PropTypes.func.isRequired,
};