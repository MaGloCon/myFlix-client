import{ useState } from "react";
import {Form, Button, Card} from 'react-bootstrap';


export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    try {
      const response = await fetch("https://cinephile-dc1b75a885d0.herokuapp.com/users/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }); 
    
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Title className="fs-1 text-center mt-2">Create an Account</Card.Title>
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
      </Card.Body>
    </Card>   
  );
};
