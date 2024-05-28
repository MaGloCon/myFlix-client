import React from 'react';
import PropTypes from 'prop-types';

export const MovieDescription = ({ movie }) => (
<>
  <div className="d-lg-none">
    <h2 className="text-uppercase">Description</h2>
    <p>{movie.description}</p>
  </div>
</>
);

MovieDescription.propTypes = { 
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
