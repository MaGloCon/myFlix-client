import { Container, Navbar, Nav, Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo2.svg";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="light" expand="md" className="px-4">
      {/* <Container> */}
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}          
            width="35"
            height="35"
            className="d-inline-block align-top"
            alt="Cinephile App logo"
          />
        </Navbar.Brand>
          <Navbar.Toggle 
            className="border-0"
            aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {!user && (
                <>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup">
                    Signup
                  </Nav.Link>
                </>
              )}
              {user && (
                <>
                  
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                    <Button 
                      variant="outline-dark" 
                      onClick={onLoggedOut}
                      >
                      Logout
                    </Button>
                </>
              )}
            </Nav>
            
          </Navbar.Collapse>
     {/* </Container> */}
    </Navbar>
  );
};
