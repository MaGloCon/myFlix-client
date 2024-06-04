import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { moviePropType, userPropType, tokenPropType } from "../../../../../utils/propTypes";

import './MovieHero.scss';
import { Button } from 'react-bootstrap';
import { BsArrowLeftCircle } from "react-icons/bs";
import { ToggleFavoriteButton2 } from '../../../FavoriteButtons/FavoriteButtons';
import { BsChevronCompactDown } from "react-icons/bs";

export const MovieHero = ({ movie, user, token, setUser}) => (
  <div
    className="movie-image-background position-relative text-white vh-90" 
    style={{ 
      background: `url(${movie.image}) no-repeat center, bottom left`,
      backgroundPosition: 'center, bottom left',
      backgroundSize: "cover",
      height: "90vh",
      width: '100vw', 
    }}
  >
    <div className="movie-hero-wrapper w-100 h-100">
      <div className="shadow-gradient">
        <div className="movie-details-container d-flex flex-column justify-content-between h-100">
          <div className="d-flex justify-content-between border-0 bg-transparent"> 
            <Link to="/">
              <div className="back-button-wrapper">
                <BsArrowLeftCircle 
                  className="back-button" 
                  size={40}/>
              </div>
            </Link>
            <ToggleFavoriteButton2
                user={user} 
                token={token} 
                movie={movie}
                setUser={setUser}
              />
          </div>
          <div className="p-3">
            <div className="mb-4">
              <h2 className="title text-uppercase d-block text-shadow">{movie.title}</h2>
              <p className="title-original text-shadow">{movie.titleOriginal.join(' | ')}</p>
            </div>
            <div className="movie-details d-flex flex-wrap clearfix px-2 ">
              <div className="left-details mb-2 col-lg-6 col-md-12">
                <div className="director-details text-shadow"> 
                  <span>Directed by </span>
                  <span className="director-name">{movie.director.map(d => d.Name).join(', ')}</span>
                </div>
                <div className="countries-text mb-3 text-shadow">{`${movie.countries.join(', ')}, ${movie.year}`}</div>
                <div className="genre-text text-shadow">{movie.genre.map(g => g.Name).join(', ')}</div>
              </div>
              <div className="right-details mb-2 hide-on-small col-lg-6 col-md-12">
                <div className="description-wrapper text-shadow ">
                  <div className="mt-2">
                    <h4 className="text-uppercase">Description</h4>
                    <p className="description-content">{movie.description}</p>
                  </div>
                </div>
              </div>
                 <Button className="chevron-icon w-100 border-0 bg-transparent"> 
                  <BsChevronCompactDown size={40}/>
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

MovieHero.propTypes = {
  movie: moviePropType,
  user: userPropType,
  token: tokenPropType,
  setUser: PropTypes.func.isRequired,
};
