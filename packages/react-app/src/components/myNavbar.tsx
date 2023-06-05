import React, { useState, useEffect } from "react";
import { Button, Container, Nav, Navbar, NavDropdown, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Nav.css";
import { useSignOut, useAuthUser } from "react-auth-kit";
import api from '../api';


export default function MyNavbar() {
	const signOut = useSignOut();

	const handleSignOut = () => {
		// Oturumu kapatma işlemini gerçekleştir
		signOut();
	};
	const auth = useAuthUser();
	const user = auth()?.username ?? "User";

	const [pp, setPP] = useState<any>("pps/default.png");


	useEffect(() => {
		const fetchData = async () => {
			api.get("upload-avatar/get-image")
				.then((data) => { setPP(data.data); console.log(data); })
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
}