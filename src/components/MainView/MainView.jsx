import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container, Col, Row, Spinner} from 'react-bootstrap';
import {NavigationBar} from '../NavigationBar/NavigationBar';
import { MovieCard } from '../MovieCard/MovieCard';
import { MovieView } from '../MovieView/MovieView';
import { LoginView } from '../LoginView/LoginView';
import { SignupView } from '../SignupView/SignupView';


export const MainView = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || 'null'));
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
  const fetchMovies = async () => {
    if (!token) return;

    setIsLoading(true); 

    try{
      const response = await fetch('https://cinephile-dc1b75a885d0.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

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
        setIsLoading(false);
      } else{
        console.error('Movie data is not available');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchMovies();
}, [token, user]);
  
  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="grow" />
      </Container>
    );
  }

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Routes>
        <Route 
          path="/signup" 
          element={
            <>
              {user ? (
                <Navigate to="/" />
              ) : (
                <Container>
                  <SignupView/>
                </Container>
              )}
            </>
          }
        />

        <Route 
          path="/login" 
          element={
            <>
              {user ? (
                <Navigate to="/" />
              ) : (
                <Container>
                  <LoginView 
                    onLoggedIn={(user) => {
                      setUser(user);
                      setToken(token);
                    }} 
                  />
                </Container>
              )}
            </>
          }
        />

        <Route 
          path="/movies/:movieId"
          element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? ( 
                <Container className="d-flex justify-content-center">The list is empty!</Container>
              ) : (
                <MovieView movies={movies}/>
              )}
            </>
          }
        />

        <Route 
          path="/" 
          element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
                ) : isLoading ? (
                  <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <Spinner animation="grow" />
                  </Container>
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
              <Container>
                <Row className="d-flex justify-content-center">
                  {movies.map((movie) => (
                    <Col xs={'auto'} xl={4} xxl={'auto'} key={movie.id}>
                      <MovieCard  
                        movie={movie} 
                      />
                    </Col>
                  ))}
                </Row>
              </Container>
            )}
          </>
        }
      />
      </Routes>
    </BrowserRouter>
  );
};