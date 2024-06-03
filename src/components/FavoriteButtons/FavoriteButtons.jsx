import axios from 'axios';
import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { BsPlusCircle, BsDashCircle } from 'react-icons/bs';

import { API_URL } from '../../../utils/constants';
import { tokenPropType, userPropType, moviePropType } from '../../../utils/propTypes';

import './FavoriteButtons.scss';

export const useFavoriteMovies = (token) => {
  const addFavoriteMovie = async (user, movieTitle) => {
    try {
      if (!user) {
        console.error('User is not defined');
        return;
      }
      const response = await axios.post(`${API_URL}/users/${user._id}/favorite/${movieTitle}`, {}, {
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        console.log('Movie added to favorites');
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFavoriteMovie = async (user, movieTitle) => {
    try {
      if (!user) {
        console.error('User is not defined');
        return;
      }
      const response = await axios.delete(`${API_URL}/users/${user._id}/favorite/${movieTitle}`, {
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        console.log('Movie removed from favorites');
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { addFavoriteMovie, deleteFavoriteMovie };
};

//MovieCard
export const ToggleFavoriteButton1 = ({user, token, movie, setUser}) => {
  const [isFavorited, setIsFavorited] = useState(user.FavoriteMovies.includes(movie.id));
  const { addFavoriteMovie, deleteFavoriteMovie } = useFavoriteMovies(token);

  const toggleFavorite = async () => {
    let updatedUser;
    if (isFavorited) {
      updatedUser = await deleteFavoriteMovie(user, movie.title);
    } else {
      updatedUser = await addFavoriteMovie(user, movie.title);
    }
    setUser(updatedUser);
    setIsFavorited(!isFavorited);
  };

  return (
    <div onClick={toggleFavorite}>
      {isFavorited 
        ? <BsDashCircle 
            size={35} 
            className="favorite-button" 
          /> 
        : <BsPlusCircle 
            size={35} 
            className="favorite-button" 
          />}
    </div>
  );
};

//MovieView/MovieHero
export const ToggleFavoriteButton2 = ({user, token, movie, setUser}) => {
  const [isFavorited, setIsFavorited] = useState(user.FavoriteMovies.includes(movie.id));
  const { addFavoriteMovie, deleteFavoriteMovie } = useFavoriteMovies(token);

  const toggleFavorite = async () => {
    let updatedUser;
    if (isFavorited) {
      updatedUser = await deleteFavoriteMovie(user, movie.title);
    } else {
      updatedUser = await addFavoriteMovie(user, movie.title);
    }
    setUser(updatedUser);
    setIsFavorited(!isFavorited);
  };

  return (
    <div 
      className="icon-wrapper2"
      onClick={toggleFavorite}
    >
      {isFavorited
        ? <BsDashCircle 
            onClick={() => addFavoriteMovie(user, movie.title)}
            size={40}
            className="favorite-button2"
          />
        : <BsPlusCircle 
            onClick={() => addFavoriteMovie(user, movie.title)}
            size={40}
            className="favorite-button2"
          />}
    </div>
  );
}

//ProfileView/FavoriteMovies
export const DeleteFavoriteButton = ({user, token, movie, setUser}) => {
  const { deleteFavoriteMovie } = useFavoriteMovies(token);

  const removeFavorite = async () => {
    console.log(user, token, movie, setUser);
    const updatedUser = await deleteFavoriteMovie(user, movie.title);
    setUser(updatedUser);
  };

  return (
    <div onClick={removeFavorite}>
      <BsDashCircle 
        size={35} 
        className="delete-button" 
      />
    </div>
  );
};

ToggleFavoriteButton1.propTypes = {
  user: userPropType,
  token: tokenPropType,
  movie: moviePropType,
  setUser: PropTypes.func.isRequired,
};

ToggleFavoriteButton2.propTypes = {
  user: userPropType,
  token: tokenPropType,
  movie: moviePropType,
  setUser: PropTypes.func.isRequired,
};

DeleteFavoriteButton.propTypes = {
  user: userPropType,
  token: tokenPropType,
  movie: moviePropType,
  setUser: PropTypes.func.isRequired,
};