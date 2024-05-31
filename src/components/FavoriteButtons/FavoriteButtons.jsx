import axios from 'axios';
import { API_URL } from '../../config';
import { BsPlusCircle } from 'react-icons/bs';
import './FavoriteButtons.scss';

export const useFavoriteMovies = (token) => {
  const addFavoriteMovie = async (user, movieTitle) => {
    console.log(user)
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { addFavoriteMovie };
};

//MovieCard
export const FavoriteButton1 = ({user, token, movie}) => {
  const { addFavoriteMovie } = useFavoriteMovies(token);
  return (
    <BsPlusCircle 
      onClick={() => addFavoriteMovie(user, movie.title)}
      size={35}
      className="favorite-button1"
    /> 
  );
};

//MovieView
export const FavoriteButton2 = ({user, token, movie}) => {
  const { addFavoriteMovie } = useFavoriteMovies(token);

  return (
    <div className="icon-wrapper2">
      <BsPlusCircle 
        onClick={() => addFavoriteMovie(user, movie.title)}
        size={40}
        className="favorite-button2"
      />
    </div>
  );
}