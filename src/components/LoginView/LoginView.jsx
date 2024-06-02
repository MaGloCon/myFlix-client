import axios from 'axios';
import { API_URL } from '../../../utils/constants';
import { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    const loginData = {
      Username: username,
      Password: password
    };

    try {
      const response = await axios.post('https://cinephile-dc1b75a885d0.herokuapp.com/login', loginData);

      const responseData = response.data; 
        if (responseData.user) {
          const user ={
            ...responseData.user,
            _id: responseData.user._id,
            Username: responseData.user.Username,
            Password: responseData.user.Password,
            Email: responseData.user.Email,
            Birthday: new Date(responseData.user.Birthday),
            FavoriteMovies: responseData.user.FavoriteMovies,
          };
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", responseData.token);
          onLoggedIn(user, responseData.token);
        } else {
          alert("No such user");
        }
      } catch (e) {
        alert("Something went wrong");
      };
    };
    
  return (
    <Card className="justify-column-center mt-3 align-item-center shadow">
      <Card.Title className="fs-1 text-center mt-4">Welcome Back</Card.Title>
      <Card.Body className="mt-1">
        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-2" controlId="Username">
            <Form.Label className="fs-6">Username <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              minLength={5}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Password">
            <Form.Label className="fs-6">Password <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
          </Form.Group>

          <Button variant="dark" type="submit" className="w-100 mt-3">Log in</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
