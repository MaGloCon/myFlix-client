import{ useState } from "react";
import {Form, Button, Image} from 'react-bootstrap';

import './signup-view.scss';
import logo from  '../../assets/logo.svg'

export const SignupView = ({ onBackToLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch("https://cinephile-dc1b75a885d0.herokuapp.com/users/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };


  return (
    <div className="shadow p-4 bg-white rounded">
      <Image variant="top" src={logo} alt="Cinephile logo" className="logo d-block mx-auto mt-4"  />
      <h1 className="fs-1 text-center mt-2">Create an Account</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2" controlId="Username">
            <Form.Label className="fs-6">Username <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3"
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="Password">
            <Form.Label className="fs-6">Password <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="Email">
            <Form.Label className="fs-6">Email <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />  
          </Form.Group>

          <Form.Group className="mb-3" controlId="Birthday">
            <Form.Label className="fs-6">Birthday <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="dark" type="submit" className="w-100 mt-3">Sign up</Button>
          </Form>
          <div className="d-flex justify-content-center align-items-center mt-4">
            <p className="m-0">Already have an account?</p>
            <Button variant="link" onClick={onBackToLogin} className="text-dark fs-7">Login</Button>
          </div>
    </div>   
  );
};
