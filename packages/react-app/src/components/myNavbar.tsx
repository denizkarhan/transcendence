import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link, HashRouter, BrowserRouter } from 'react-router-dom';
import './Nav.css'

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
          <Nav className="">
            <Link style={linkStyle} type=""to="home">Home</Link>
            <Link style={linkStyle} to="signin">Sign in</Link>
            <Link style={linkStyle} to="signup">Sign up</Link>
          </Nav>
          <Nav className="">
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                User
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link style={linkStyle} to="profile">Profile</Link>
                  <Link style={linkStyle} to="logout">Log out</Link>
                  <Link style={linkStyle} to="settings">Settings</Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}