import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

import { BsArrowLeftCircle } from "react-icons/bs";


import './MovieView.scss';

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find(movie => movie.id === movieId);

  return (
    <div>
      <div className="position-relative text-white text-uppercase" style={{ position: 'relative' }}>
        <Image className="shadow-gradient" src={movie.image} alt={movie.title}/>
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
      <Link to="/">
          <BsArrowLeftCircle 
            className="back-button" 
            size={40}/>
      </Link>
    </div>
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