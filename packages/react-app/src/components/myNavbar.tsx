<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from "react";
import { Button, Container, Nav, Navbar, NavDropdown, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Nav.css";
import { useSignOut, useAuthUser } from "react-auth-kit";
import api from '../api';


export default function MyNavbar() {
	const signOut = useSignOut();

	const handleSignOut = async () => {
		await api.get("auth/logout");
		signOut();
	};
	const auth = useAuthUser();
	const user = auth()?.username ?? "User";

	const [pp, setPP] = useState<string>("pps/default.png");


	useEffect(() => {
		const fetchData = async () => {
			await api.get("upload-avatar/get-image", {
				responseType: 'blob',
			})
				.then((response) => {
					const blob = new Blob([response.data], { type: 'image/jpeg' });
					const objectUrl = URL.createObjectURL(blob);
					setPP(objectUrl);
				})
				.catch();
		};

		fetchData();
	}, []);
	return (
		<Navbar className="navbar navbar-expand-lg navbar-dark bg-black" expand="true">
			<Container fluid className="ml-4">
				<Navbar.Brand as={Link} to="/">
					Winx Club
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
					<Nav>
						<img src={pp} className="img-style" />
						<NavDropdown title={user} id="collasible-nav-dropdown" align={"end"}>
							<NavDropdown.Item as={Link} to="/profile"> Profile</NavDropdown.Item>
							<NavDropdown.Item as={Link} to="/settings"> Settings</NavDropdown.Item>
							<NavDropdown.Item onClick={handleSignOut}>Log Out</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
>>>>>>> main
}