import React from 'react';
import PropTypes from 'prop-types';
import { Col, Image } from 'react-bootstrap';

export const MovieDirector = ({ movie }) => (
<>
    <h2 className="text-uppercase p-2">Director</h2>
    <div className="d-flex justify-content-center align-items-start">
      <Image className="p-2" src="https://placehold.co/180x230"/>
      <div className="ml-3 p-2">
        <h3 className="director-name">{movie.director.map(d => d.Name).join(', ')}</h3>
        <p className="director-bio">{movie.director.map(d => d.Bio).join(', ')}</p>
      </div>
    </div>
</>
);

MovieDirector.propTypes = {
  id: PropTypes.string.isRequired,
  movie: PropTypes.shape({
    director: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        Bio: PropTypes.string,
        birth: PropTypes.string,
        death: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
};

