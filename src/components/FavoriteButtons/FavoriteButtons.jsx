import axios from 'axios';
import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Toast } from 'react-bootstrap';
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
export const ToggleFavoriteButton2 = ({user, token, movie, setUser, setShowToast, setToastMessage}) => {
  const [isFavorited, setIsFavorited] = useState(user.FavoriteMovies.includes(movie.id));
  const { addFavoriteMovie, deleteFavoriteMovie } = useFavoriteMovies(token);
  // const [showToast, setShowToast] = useState(false);
  // const [toastMessage, setToastMessage] = useState('');

  const toggleFavorite = async () => {
    let updatedUser;
    if (isFavorited) {
      updatedUser = await deleteFavoriteMovie(user, movie.title);
      // setToastMessage('Success! Movie has been removed from favorites');
    } else {
      updatedUser = await addFavoriteMovie(user, movie.title);
      // setToastMessage('Success! Movie has been added to favorites');
    }
    setUser(updatedUser);
    setIsFavorited(!isFavorited);
    // setShowToast(true);
  };

  return (
    <>
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
    </>
  );
}

//ProfileView/FavoriteMovies
export const DeleteFavoriteButton = ({user, token, movie, setUser, setShowToast, setToastMessage}) => {
  const { deleteFavoriteMovie } = useFavoriteMovies(token);

  const removeFavorite = async () => {
    const updatedUser = await deleteFavoriteMovie(user, movie.title);
    setUser(updatedUser);
    // setToastMessage('Success! Movie has been removed from favorites');
    // setShowToast(true);
  };

  return (
    <>
      <div onClick={removeFavorite}>
        <BsDashCircle 
          size={35} 
          className="delete-button" 
        />
      </div>
      {/* <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
        <Toast.Header>
          <strong className="mr-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Movie removed from favorites</Toast.Body>
      </Toast> */}
    </>
  );
};

// export const ToastMessage = ({showToast, setShowToast, toastMessage}) => {
//   return (
//     <div className="toast-container">
//       <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
//         <Toast.Body className="text-dark">{toastMessage}</Toast.Body>
//       </Toast>
//     </div>
//   );
// };

// ToastMessage.propTypes = {
//   showToast: PropTypes.bool.isRequired,
//   setShowToast: PropTypes.func.isRequired,
//   toastMessage: PropTypes.string.isRequired,
// };

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
  setShowToast: PropTypes.func.isRequired,
  setToastMessage: PropTypes.func.isRequired,
};