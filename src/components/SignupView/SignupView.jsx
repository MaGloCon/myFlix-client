import{ useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_URL } from '../../../utils/constants';
import {Row, Col, Card, Form, Button, Image} from 'react-bootstrap';
import design from '../../assets/design.svg';
import './SignupView.scss';

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    try {
      const response = await axios.post(`${API_URL}/users/signup`, data, {
        headers: {
          "Content-Type": "application/json"
        }
      }); 

      if (response.status === 201) {
        alert("Signup successful");
        navigate('/login');
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Row className="d-flex h-100">
      <Col className="left-wrapper d-flex flex-column justify-content-center h-100 w-50 text-white">
        <div className="d-flex w-100 mx-4">
          <div>
            <h1 className="heading-left fw-bold">Cinephile</h1>
            <h3 className="subheading">Curate and discover the world of cinema</h3>
          </div>
        </div>
        <Image src={design} alt="design" className="design" height="400px" width="400px" />
      </Col>
      <div className="align-content-center w-50 p-4 h-100">
        <Card className="h-100">
          <Card.Title className="fs-1 text-center mt-5">Create an Account</Card.Title>
          <Card.Body className="mt-4">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="Username">
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

              <Form.Group className="mb-3" controlId="Password">
                <Form.Label className="fs-6">Password <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Email">
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
          </Card.Body>
        </Card>   
      </div>
    </Row>
  );
};
