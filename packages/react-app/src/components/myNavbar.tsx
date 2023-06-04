import React from "react";
import { Button, Container, Nav, Navbar, NavDropdown, NavLink } from "react-bootstrap";
// import Button from 'react-bootstrap/Button';
// import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from "react-router-dom";
import "./Nav.css";
import { useSignOut } from "react-auth-kit";


export default function MyNavbar() {
	const signOut = useSignOut();

	const handleSignOut = () => {
	  // Oturumu kapatma işlemini gerçekleştir
	  signOut();
	};
	return (
		<Navbar className="navbar navbar-expand-lg navbar-dark bg-black" expand="true">
			<Container fluid className="ml-4">
				<Navbar.Brand as={Link} to="/">
					Winx Clup
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
					{/* {isAuthenticated() ? ( */}
					<Nav>
						<NavDropdown title="User" id="collasible-nav-dropdown" align={"end"}>
						<NavDropdown.Item as={Link} to="/profile"> Profile</NavDropdown.Item>
						<NavDropdown.Item onClick={handleSignOut}>Log Out</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}