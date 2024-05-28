import React from 'react';
import { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const data = {
      Username: username,
      Password: password
    };

    try {
      const response = await fetch('https://cinephile-dc1b75a885d0.herokuapp.com/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();
      console.log("Login response: ", responseData);
     
        if (responseData.user) {
          localStorage.setItem("user", JSON.stringify(responseData.user));
          localStorage.setItem("token", responseData.token);
          onLoggedIn(responseData.user, responseData.token);
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
