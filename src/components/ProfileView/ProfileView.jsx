import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Card, Container, Row, Col, Modal, Dropdown, DropdownButton } from 'react-bootstrap';
import { FaCog } from 'react-icons/fa';

import { API_URL } from '../../utils/constants.js';
import { moviePropType, userPropType, tokenPropType } from '../../utils/propTypes.js'; 


import { UserInfo } from './MyProfile/UserInfo.jsx';
import { UpdateModal } from './MyProfile/UpdateDeleteUserModals';
import { DeleteModal } from './MyProfile/UpdateDeleteUserModals';
import {FavoriteMovies} from './FavoriteMovies/FavoriteMovies';

export const ProfileView = ({ user, token, movies, setUser }) => {
  const [username, setUsername]= useState(user ? user.Username : '');
  const [email, setEmail] = useState(user ? user.Email : '');
  const [password, setPassword]= useState('');
  const [birthday, setBirthday] = useState(user ? new Date(user.Birthday) : new Date());

  const favoriteMovieIds = user.FavoriteMovies;
  const filteredFavoriteMovies = movies.filter(movie => favoriteMovieIds.includes(movie.id));

  const [modalShow, setModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);

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
          updateUser(updatedUser);
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

  const handleDeleteAccount = async (user, token) => {
    try {
      const response = await axios.delete(`${API_URL}/users/profile/delete/${user._id}`, {
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        alert("Account deleted successfully.");
        localStorage.clear();
        navigate('/signup');
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      console.error(error);
    }
  }

 return (
    <>
        <Container>
          <Row className="mt-5 bg-light border border-secondary shadow-sm rounded">
            <h3 className="p-2 bg-dark text-white text-center fw-light">My Profile</h3>
            <Container className="p-3">
              <UserInfo user={user} />
              <div className="d-flex justify-content-end">
                <DropdownButton variant="dark" className='border-1' id="setting-dropdown" title={<FaCog />}>
                  <Dropdown.Item onClick={() => setModalShow(true)}>Update Info</Dropdown.Item>
                  <Dropdown.Item onClick={() => setDeleteModalShow(true)}>Delete Account</Dropdown.Item>
                </DropdownButton>
              </div>
                <UpdateModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  profileUpdateData={profileUpdateData}
                  handleUpdate={handleUpdate}
                  handleSubmit={handleSubmit}
                />
                <DeleteModal
                  show={deleteModalShow}
                  onHide={() => setDeleteModalShow(false)}
                  handleDeleteAccount={handleDeleteAccount}
                  user={user}
                  token={token}
                />
            </Container>
          </Row>
      
        <div>
          <h3 className="text-center mt-3 mb-3">Favorites Films</h3>
          <Container>
           <Row> 
              {filteredFavoriteMovies.length > 0 ? (
                filteredFavoriteMovies.map((movie) => (
                  <Col xs={12} sm={12} md={6} xxl={4} key={movie.id} className='d-flex justify-content-center'>
                    <FavoriteMovies 
                      movie={movie}
                      user={user}
                      token={token}
                      setUser={setUser}
                    />
                  </Col>
                ))
              ) : (
                <p className="text-center">You haven't added any films to your favorites yet.</p>
              )}
            </Row>
          </Container>
        </div>
        </Container>
      </>
    );
}

ProfileView.propTypes = {
  user: userPropType,
  token: tokenPropType,
  movies: PropTypes.arrayOf(moviePropType).isRequired,
  movie: moviePropType,
  setUser: PropTypes.func.isRequired,
};