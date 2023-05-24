import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import './Nav.css'

export default async function MyNavbar() {
  const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: 'blue'
  };

  const user = await axios.get('/user');

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to="/home" className="navbar-brand">Winx Club</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
            <Link style={linkStyle} type=""to="home">Home</Link>
            <Link style={linkStyle} to="login">Sign in</Link>
            <Link style={linkStyle} to="register">Sign up</Link>
          </Nav>
          <Nav className="">
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                User
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link style={linkStyle} to="profile">Profile</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link style={linkStyle} to="logout">Log out</Link>
                </Dropdown.Item>
                <Dropdown.Item>
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