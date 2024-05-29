import { useState} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container, Col, Row, Spinner} from 'react-bootstrap';

import { useMovies } from '../../hooks/useMovies';

import { MovieCard } from '../MovieCard/MovieCard';
import { MovieView } from '../MovieView/MovieView';
import { LoginView } from '../LoginView/LoginView';
import { SignupView } from '../SignupView/SignupView';
// import { ProfileView } from '../ProfileView/ProfileView';
import { NavigationBar } from '../NavigationBar/NavigationBar';

export const MainView = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || 'null'));
  const [token, setToken] = useState(localStorage.getItem("token"));

  const { movies, isLoading } = useMovies(token);

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
              ) : movies.length === 0 ? (
                <Container className="d-flex justify-content-center">The list is empty!</Container>
              ) : (
              <Container>
                <Row className="d-flex justify-content-center">
                  {movies.map((movie) => (
                    <Col xs={'auto'} xl={4} xxl={'auto'} key={movie.id}>
                      <MovieCard  
                        movie={movie}
                        // isFavorite={user.favoriteMovies.includes(movie.id)}
                      />
                    </Col>
                  ))}
                </Row>
              </Container>
              )}
            </>
          }
        />
        {/* <Route
          path="/profile"
          element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={8}>
                  <ProfileView
                    localUser={user}
                    movies={movies}
                    token={token}
                  />
                </Col>
              )}
            </>
          }
      /> */}
      </Routes>
    </BrowserRouter>
  );
};