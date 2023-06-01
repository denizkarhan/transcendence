import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useSignOut, useIsAuthenticated } from 'react-auth-kit'
// import axios from "axios";
// import Container from "react-bootstrap/Container";
// import nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import { Link } from "react-router-dom";
// import { UserTemplate } from "./Main";
import "./Nav.css";


export default function MyNavbar() {
	const signOut = useSignOut();
	return (
		<Navbar className="navbar navbar-expand-lg navbar-dark bg-dark" expand="true">
			<Container fluid className="ml-4">
				<Navbar.Brand href="/">
					Winx Clup
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
					{/* {isAuthenticated() ? ( */}
					<Nav>
						<NavDropdown title="User" id="collasible-nav-dropdown" align={"end"}>
							<NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
							<NavDropdown.Item href="/logout" onClick={() => signOut()}>Log Out</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					{/* ) : (
					 	<Nav>
					 		<Nav.Link href="/login">Sign in</Nav.Link>
					 		<Nav.Link href="/register">Sign up</Nav.Link>
					 	</Nav>
					 )} */}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
{/* <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark" expand="true">
			<Container fluid className="ml-4">
				<Navbar.Brand>
					Winx Clup
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="#features">Features</Nav.Link>
						<Nav.Link href="#pricing">Pricing</Nav.Link>
					</Nav>
					<Nav className="mr-4">
						<NavDropdown title="Dropdown" id="collasible-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">
								Separated link
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar> */}