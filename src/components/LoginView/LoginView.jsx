import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Form, Button, Image, Alert } from 'react-bootstrap';

import { fetchUser } from '../../store/user/userSlice';
import { selectError } from '../../store/user/userSelectors';


import design from '../../assets/design.svg';

import './LoginView.scss';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const error = useSelector(selectError);

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    dispatch(fetchUser({ username, password }));
  };
  

  return (
    <Row className="d-flex h-100">
      <Col className="left-wrapper d-flex flex-column justify-content-center h-100 w-50 text-white">
        <div className="d-flex w-100 mx-4">
          <div>
            <h1 className="heading-left fw-bold">Cinephile</h1>
            <h3 className="">Curate and discover the world of cinema</h3>
          </div>
        </div>
        <Image src={design} alt="design" className="design" height="400px" width="400px" />
      </Col>
      <div className="align-content-center w-50 p-4 h-100">
        <Card className="h-100">
          <Card.Title className="fs-1 text-center mt-5">Welcome Back</Card.Title>
          <Card.Body className="mt-4">
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4" controlId="Username">
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

              <Form.Group className="mb-4" controlId="Password">
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
      </div>
    </Row>
  );
};
