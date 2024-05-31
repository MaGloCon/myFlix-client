import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Card, Container, Row, Col, Tab, ListGroup} from 'react-bootstrap';

import { API_URL } from '../../config';
import { UpdateForm} from './UpdateForm.jsx';
import { UserInfo } from './UserInfo.jsx';
import {FavoriteMovies} from './FavoriteMovies/FavoriteMovies';

export const ProfileView = ({ user, token, movies }) => {
  const [username, setUsername]= useState(user ? user.Username : '');
  const [email, setEmail] = useState(user ? user.Email : '');
  const [password, setPassword]= useState('');
  const [birthday, setBirthday] = useState(user ? new Date(user.Birthday) : new Date());

  const favoriteMovieIds = user.FavoriteMovies;
  const favoriteMovies = movies.filter(movie => favoriteMovieIds.includes(movie.id));

  const navigate = useNavigate();
    
  let profileUpdateData = {
      Username: username,
      Email: email,
      Birthday: birthday ? new Date(birthday).toISOString().split('T')[0] : null,
  };

  if (password) {
    profileUpdateData.Password = password;
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault(event);
    try {
      const response = await axios.put(`${API_URL}/users/profile/update/${user.Username}`, profileUpdateData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        alert("Update successful");
        const updatedUser = response.data;
        if (updatedUser) {
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      } else {
        alert("Update failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (e) => {
    switch(e.target.name) {
      case "username":
        setUsername(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "birthday":
        setBirthday(e.target.value);
        default:
    }
  }

  const handleDeleteAccount = async (id, token) => {
    try {
      const response = await axios.delete(`${API_URL}/users/profile/delete/${id}`, {
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        alert("Account deleted successfully.");
        localStorage.clear();
        navigate('/');
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      console.error(error);
    }
  }

 return (
    <Container className="justify-content-center">
      <Card className="mb-5">
        <Card.Title>My Profile</Card.Title>
        <Card.Body>
             <UserInfo user={user}/>
        </Card.Body>
      </Card>
        <div> 
          {favoriteMovies.map((movie) => (
            <Col className="mb-5" xs={12} md={12} key={movie.id}>
              <FavoriteMovies 
                movie={movie}
                user={user}
                token={user}
                />
            </Col>
            ))}
        </div>
        <Card>
          <Card.Body>
            <UpdateForm
              profileUpdateData={profileUpdateData}
              handleUpdate={handleUpdate}
              handleSubmit={handleSubmit}
            />
            <Button onClick={() => handleDeleteAccount(username, token)}
              className="button-delete mb-5" 
              type="submit" variant="outline-secondary"
            >
              Delete account
            </Button>
          </Card.Body>
          
            
      </Card>
    </Container>

  )
};