// hooks/useMovies.js
import { useState, useEffect } from 'react';
import { API_URL } from '../config';

export const useMovies = (token) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!token) return;

      setIsLoading(true); 

      try {
        const response = await fetch(`${API_URL}/movies`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (data) {
          const moviefromApi = data.map((movie) => ({
            id: movie._id,
            image: movie.ImagePath,
            title: movie.Title,
            titleOriginal: movie.TitleOrigin,
            description: movie.Description,
            year: movie.Year,
            countries: movie.Countries,
            genre: movie.Genre,
            director: movie.Director,
            actors: movie.Actors,
            featured: movie.Featured,
          }));

          setMovies(moviefromApi);
        } else {
          console.error('Movie data is not available');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [token]);

  return { movies, isLoading };
};