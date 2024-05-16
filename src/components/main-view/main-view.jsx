import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      Title: 'The Lighthouse',
      Year: '2019',
      Countries: ['United States', 'Canada'],
      Description: 'Robert Eggers\' hypnotic psychological thriller plunges viewers into a nightmarish descent into madness, as two lighthouse keepers grapple with isolation, paranoia, and supernatural forces.',
      Genre: ['Horror'],
      Director: ['Robert Eggers'],
      Actors: ['Willem Dafoe', 'Robert Pattinson'],
      ImagePath: 'https://res.cloudinary.com/djyfpaduv/image/upload/v1714924983/theLighthouse_rmompd.webp',
      Featured: true
    },
    {
      id: 2,
      Title: 'Paprika',
      Year: '2006',
      Countries: ['Japan'],
      Description: 'Satoshi Kon\'s "Paprika" is a mind-bending journey into the realm of dreams and subconscious. With its stunning animation and intricate narrative, the film explores the blurred lines between reality and fantasy, taking viewers on a surreal adventure that challenges perceptions of identity and consciousness.',
      Genre: ['Animation'],
      Director: ['Satoshi Kon'],
      Actors: ['Megumi Hayashibara', 'Tōru Furuya', 'Kōichi Yamadera', 'Katsunosuke Hori', 'Tōru Emori'],
      ImagePath: 'https://res.cloudinary.com/djyfpaduv/image/upload/v1714924967/paprika_wyslsh.webp',
      Featured: true
    },
    {
      id: 3,
      Title: 'Breathless',
      Year: '1960',
      Countries: ['France'],
      Description: 'Renowned for its groundbreaking storytelling, dynamic camerawork, and unconventional editing techniques, this quintessential piece of French New Wave cinema follows Michel, a small-time criminal, and his American girlfriend Patricia, as they grapple with love, crime, and existential dilemmas on the vibrant streets of Paris. Their tumultuous journey takes an intense turn when Michel commits a spontaneous act of violence, setting them on the run from the authorities.',
      Genre: ['Crime'],
      Actors: ['Jean-Paul Belmondo', 'Jean Seberg', 'Daniel Boulanger', 'Jean-Pierre Melville', 'Henri-Jacques Huet'],
      ImagePath: 'https://res.cloudinary.com/djyfpaduv/image/upload/v1714924927/breathless_izjhdj.webp',
      Featured: true
    }
  ]);

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