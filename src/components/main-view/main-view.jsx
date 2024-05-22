import { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';

import { Container, Navbar, Nav} from 'react-bootstrap';


import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || '{}'));
  const [token, setToken] = useState(localStorage.getItem("token"));
  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    if (!token) return;

    fetch('https://cinephile-dc1b75a885d0.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => response.json())
      .then((data) => {
        if (data) {
          console.log(data);
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
          console.error('Movie data is not available');
        }
      })
      .catch(error => console.error('Error:', error));
  }, [token]);

    if (Object.keys(user).length === 0) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
      </>
    );
  };
 
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
      <Container>
        <Row className="justify-content-center" >
          {movies.map((movie) => (
            <Col xs={'auto'} md={'auto'} lg={'auto'} xl={'4'} xxl={'auto'} key={movie.id}>
              <MovieCard  
                movie={movie} 
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </Row>
      </Container>
  );
};