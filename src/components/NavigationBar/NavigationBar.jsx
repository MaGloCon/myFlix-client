import { Container, Navbar, Nav, Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo2.svg";
import { SearchBar } from './SearchBar/SearchBar';

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="light" expand="lg" className="px-4">
      {/* <Container> */}
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}          
            width="35"
            height="35"
            className="d-inline-block align-top me-2"
            alt="Cinephile App logo"
          />
        </Navbar.Brand>
        <div>
          {!user && ( ''
            )}
              {user && (
          <SearchBar />
              )}
        </div>
        <Navbar.Toggle 
          className="border-0"
          aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto text-center">
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
                  {/* <Nav.Link as={Link} to="/">Home</Nav.Link> */}
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
