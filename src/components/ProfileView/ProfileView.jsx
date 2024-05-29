import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Card, Container, Row, Col} from 'react-bootstrap';

import { API_URL } from '../../config';
import { UpdateForm} from './UpdateForm.jsx';
import { UserInfo } from './UserInfo.jsx';
// import {FavoriteMovies} from './FavoriteMovies/FavoriteMovies.jsx';

// import { useFavoriteMovies } from '../../hooks/useFavoriteMovies';

export const ProfileView = ({ user, token }) => {

    const [username, setUsername]= useState(user ? user.Username : '');
    const [email, setEmail] = useState(user ? user.Email : '');
    const [password, setPassword]= useState(user ? user.Password : '');
    const [birthday, setBirthday] = useState(user ? new Date(user.Birthday) : new Date());

    const navigate = useNavigate();
    
  // const { favoriteMovies } = useFavoriteMovies(API_URL, token, user._id);

    const profileUpdateData = {
        username: username,
        email: email,
        birthday: new Date(birthday).toISOString(),
        password: password
      };

    const handleSubmit = async (event) => {
        event.preventDefault(event);
        try {
            const response = await fetch(`${API_URL}/users/profile/update/${user.username}`, {
                method: "PUT",
                body: JSON.stringify(profileUpdateData),
                headers: {
                  "Content-Type": "application/json",
                   Authorization: `Bearer ${token}` }
                }
              );

            if (response.ok) {
                alert("Update successful");
                const updatedUser = await response.json();
                if (updatedUser) {
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    setUserUpdate(updatedUser);
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

    const handleDeleteAccount = async (id) => {
        try {
            const response = await fetch (`${API_URL}/users/profile/delete`, {
              method: "DELETE",
              headers: { 
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
              }
          });

          if (response.ok) {
              alert("Account deleted successfully.");
              localStorage.clear();
              navigate('/');
          } else {
              alert("Something went wrong.");
          }
        } catch (error) {
            console.error(error);
        }
    };

 return (
    <Container className="mx-1">
    <Row>
        <Card className="mb-5">
            <Card.Body>
                <Card.Title>My Profile  </Card.Title>
                    <Card.Text>
                        {
                            (<UserInfo name ={user.Username} email={user.Email} />)
                        }
                    </Card.Text>              
            </Card.Body>            
        </Card>
        <Card className="mb-5"> 
        <Card.Body>
          <UpdateForm
           profileUpdateData={profileUpdateData}
           handleUpdate={handleUpdate}
           handleSubmit={handleSubmit}
           />
           </Card.Body>
           </Card>      
    </Row>
    <Button onClick={() => handleDeleteAccount()} 
        className="button-delete mb-5" 
        type="submit" variant="outline-secondary"
        >
        Delete account
        </Button>
    {/* <Row>
        <Col className="mb-5" xs={12} md={12}>
          {
            favoriteMovies && favoriteMovies.map(movie => (
            <FavoriteMovies key={movie.id} movie={movie} />
          ))
        }
        </Col>
      </Row> */}
      </Container>
  )
}