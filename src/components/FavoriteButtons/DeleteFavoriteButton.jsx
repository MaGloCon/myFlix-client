import axios from 'axios';
import { API_URL } from '../../config';
import { BsXCircle } from 'react-icons/bs'; 

export const useFavoriteMovies = (token) => {
  const deleteFavoriteMovie = async (user, movieTitle) => {
    try {
      if (!user) {
        console.error('User is not defined');
        return;
      }
      const response = await axios.delete(`${API_URL}/users/${user._id}/favorite/${movieTitle}`, {}, {
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        console.log('Movie removed from favorites');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { deleteFavoriteMovie };
};

//ProfileView/FavoriteMovies
export const DeleteFavoriteButton = ({user, token, movie}) => {
  const { deleteFavoriteMovie } = useFavoriteMovies(token);

  return (
    <BsXCircle 
      onClick={() => deleteFavoriteMovie(user, movie.title)}
      size={35}
      className="delete-favorite-button"
    /> 
  );
};