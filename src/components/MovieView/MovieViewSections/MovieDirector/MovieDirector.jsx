import React from 'react';
import PropTypes from 'prop-types';
import { Col, Image } from 'react-bootstrap';
import './MovieDirector.scss';

export const MovieDirector = ({ director }) => (
    <div className="director-section d-flex justify-content-center align-items-start p- mb-3">
      <Image className="director-portrait p-2" src="https://placehold.co/200x230"/>
      <div className="director-text ml-3 p-2">
        <h3 className="director-name">{director.Name}</h3>
        <div className="director-bio">
        <p className="bio-content">{director.Bio}</p>
        </div>
      </div>
    </div>
);

MovieDirector.propTypes = {
  director: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    bio: PropTypes.string,
    birth: PropTypes.string,
    death: PropTypes.string,
  }).isRequired,
};
