import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import {Link, HashRouter, BrowserRouter} from 'react-router-dom';

export default function MyNavbar() {
  const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: 'blue'
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/home">Winx Club</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link style={linkStyle} to="home">Home</Link>
            <Link style={linkStyle} to="profile">Profile</Link>
            <Link style={linkStyle} to="signin">Sign in</Link>
            <Link style={linkStyle} to="signup">Sign up</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}