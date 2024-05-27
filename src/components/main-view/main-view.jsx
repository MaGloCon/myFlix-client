import { useState, useEffect } from 'react';
import { Container, Col, Row, Spinner} from 'react-bootstrap';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';


export const MainView = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || '{}'));
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [showSignup, setShowSignup] = useState(false);

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
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
}, [token]);

  if (Object.keys(user).length === 0) {
    return (
      <>
        {showSignup ? (
          <Container className="d-flex justify-content-center align-items-center vh-100">
            <Row className="d-flex justify-content-center align-items-center vw-100">
              <Col xs={12} md={7}>
                <SignupView onBackToLogin={() => setShowSignup(false)} />
              </Col>
            </Row>
          </Container>
        ) : (
          <Container className="d-flex justify-content-center align-items-center vh-100">
            <Row className="d-flex justify-content-center align-items-center vw-100">
              <Col sm={12} md={8}>
                <LoginView 
                  onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                  }} 
                  onShowSignup={() => setShowSignup(true)}
                />
              </Col>
            </Row>
          </Container>
        )}
      </>
    );
  }
  
  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="grow" />
      </Container>
    );
  }

  if (selectedMovie) {
    return (
      <Row className="justify-content-md-center">
        <Col md={8}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => {
              setSelectedMovie(null);
            }}
          />
        </Col>
      </Row>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

 
  return (
    <>
      <button className="btn btn-primary" onClick={() => { setUser({}); setToken(null); localStorage.clear(); }}>Logout</button>

        <Container className="text-center">
          <h1>Browse</h1>
          <p>Explore the movies in the Cinephile Database</p>
        </Container>
        <Row className="justify-content-center">
          {movies.map((movie) => (
            <Col xs={'auto'} xl={4} xxl={'auto'} key={movie.id}>
              <MovieCard  
                movie={movie} 
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </Row>
    </>
  );
};