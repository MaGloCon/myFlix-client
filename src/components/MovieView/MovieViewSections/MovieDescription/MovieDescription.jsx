import React from 'react';
import PropTypes from 'prop-types';

export const MovieDescription = ({ movie }) => (
<>
  
    <h2 className="text-uppercase">Description</h2>
    <p>{movie.description}</p>

</>
);

MovieDescription.propTypes = {
  movie: PropTypes.shape({
    description: PropTypes.string.isRequired,
  }).isRequired,
};