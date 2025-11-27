import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import FadeIn from "./animations/FadeIn";

export default function Layout({ children }) {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark" className="shadow-sm px-3">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            🌐 LinguaAI
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto align-items-center">

              {!isLoggedIn && (
                <>
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Button
                    as={Link}
                    to="/login"
                    className="btn-animated me-2"
                    variant="outline-light"
                  >
                    Login
                  </Button>
                  <Button
                    as={Link}
                    to="/register"
                    className="btn-animated"
                    variant="primary"
                  >
                    Sign Up
                  </Button>
                </>
              )}

              {isLoggedIn && (
                <>
                  <span className="text-light me-3">
                    👋 Hello, <strong>{user?.username || "Learner"}</strong>
                  </span>
                  <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                  <Nav.Link as={Link} to="/lessons">Lessons</Nav.Link>
                  <Button
                    className="btn-animated ms-3"
                    variant="danger"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-3">
        <FadeIn>{children}</FadeIn>
      </Container>
    </>
  );
}
