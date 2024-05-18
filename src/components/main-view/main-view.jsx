import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
  fetch('https://cinephile-dc1b75a885d0.herokuapp.com/movies')
    .then(response => response.json())
    .then((data) => {
      console.log('Fetched data:', data);
      if (data) {
        const moviefromApi = data.map((movie) => {
          return {
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
          };
        });
        setMovies(moviefromApi);
      } else {
        console.error('Movies data is not available');
      }
    })
    .catch(error => console.error('Error:', error));
}, []);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView 
        movie={selectedMovie}
        onBackClick={() => {
          setSelectedMovie(null);
        }}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard 
          key={movie.id}  
          movie={movie} 
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};