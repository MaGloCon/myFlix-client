import axios from 'axios';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container, Col, Row, Spinner} from 'react-bootstrap';

import { MovieCard } from '../MovieCard/MovieCard';
import { MovieView } from '../MovieView/MovieView';
import { LoginView } from '../LoginView/LoginView';
import { SignupView } from '../SignupView/SignupView';
import { ProfileView } from '../ProfileView/ProfileView';
import { NavigationBar } from '../NavigationBar/NavigationBar';

import { API_URL } from '../../config';

export const MainView = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!token) return;

      setIsLoading(true);

      try {
        const response = await axios.get(`${API_URL}/movies`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data) {
          const moviefromApi = response.data.map((movie) => ({
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
                    onLoggedIn={(user, token) => {
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
                <MovieView 
                  movies={movies}
                  token={token}
                  user={user}
                />
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
              ) : movies.length === 0 ? (
                <Container className="d-flex justify-content-center">The list is empty!</Container>
              ) : (
              <Container>
                <Row className="d-flex justify-content-center">
                  {movies.map((movie) => (
                    <Col xs={'auto'} xl={4} xxl={'auto'} key={movie.id}>
                      <MovieCard  
                        movie={movie}
                        token={token}
                        user={user}
                      />
                    </Col>
                  ))}
                </Row>
              </Container>
              )}
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={8}>
                  <ProfileView
                    user={user}
                    movies={movies}
                    token={token}
                  />
                </Col>
              )}
            </>
          }
      />
      </Routes>
    </BrowserRouter>
  );
};