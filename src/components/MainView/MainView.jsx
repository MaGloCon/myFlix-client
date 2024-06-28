import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setToken, logout } from '../../store/user/userSlice';
import { selectUser, selectToken } from '../../store/user/userSelectors';
import { fetchMovies, searchMovies } from '../../store/movies/moviesSlice';
import { selectMovies, selectIsLoading } from '../../store/movies/moviesSelectors';

import { Container, Col, Row, Spinner} from 'react-bootstrap';

import { NavigationBar } from '../NavigationBar/NavigationBar';
import { LoginView } from '../LoginView/LoginView';
import { SignupView } from '../SignupView/SignupView';
import { MovieCard } from '../MovieCard/MovieCard';
import { MovieView } from '../MovieView/MovieView';
import { ProfileView } from '../ProfileView/ProfileView';

import './MainView.scss';

export const MainView = () => {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const movies = useSelector(selectMovies);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const [isRendering, setIsRendering] = useState(true); 

  const handleSearch = (searchTerm) => {
    dispatch(searchMovies(searchTerm));
  };
  
  const updateUser = (updatedUser) => {
    dispatch(setUser(updatedUser));
    dispatch(setToken(token));
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchMovies());
    }
  }, [token, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRendering(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || isRendering) {
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
            dispatch(logout());
        }}
        onSearch={handleSearch}
      />
      <Routes>
        <Route 
          path="/signup" 
          element={
            <>
              {user ? (
                <Navigate to="/" />
              ) : (
                <Container fluid className="signup-background">
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
                <Container fluid className="login-background">
                  <LoginView 
                    onLoggedIn={(user, token) => {
                    dispatch(setUser(user));
                    dispatch(setToken(token));
                  }}
                  />
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
                (movies.length) && 
                <ProfileView
                  user={user}
                  movies={movies}
                  token={token}
                  setUser={updateUser}
                />
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
                  setUser={updateUser}
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
                        setUser={updateUser}
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