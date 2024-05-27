import React from "react";
import PropTypes from "prop-types";

import './movie-view.scss';

export const MovieView = ({ movie }) => {
  return (
    <div>
      <div className="position-relative text-white text-uppercase" style={{ position: 'relative' }}>
        <img className="shadow-gradient" src={movie.image} alt={movie.title}/>
        <div style={{ position: 'absolute', bottom: '0', left: '0' }}>
          <h1>{movie.title}</h1>
          <p>{movie.titleOriginal.join(' | ')}</p>
        </div>
      </div>
      <div>
        <span>Country: </span>
        <span>{movie.countries.join(', ')}</span>
      </div>
      <div>
        <span>Year: </span>
        <span>{movie.year}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre.map(g => g.Name).join(', ')}</span>
      </div>
       <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.map(d => d.Name).join(', ')}</span>
      </div>
      <div>
        <span>Actors: </span>
        <span>{movie.actors.join(', ')}</span>
      </div>
      <button>Back</button>
    </div>
  );
};

MovieView.propTypes = { 
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    titleOriginal: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    countries: PropTypes.arrayOf(PropTypes.string).isRequired,
    genre: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
      })
    ).isRequired,
    director: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
      })
    ).isRequired,
    actors: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};