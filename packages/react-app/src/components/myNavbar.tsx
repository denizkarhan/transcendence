import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Nav.css";
import { useAuthUser, useSignOut } from "react-auth-kit";
import api from '../api';
import { getPP } from './Main';


interface Props {
	pp: string,
	setPP: React.Dispatch<React.SetStateAction<string>>,
}

export default function MyNavbar(prop: Props) {
	const signOut = useSignOut();
	const auth = useAuthUser();

	const user = auth()?.username ?? "User";
	const handleSignOut = async () => {
		await api.get("auth/logout");
		signOut();
	};

	useEffect(() => {
		const fetchData = async () => {
			prop.setPP(await getPP(undefined));
		};
		fetchData();
	}, []);
	return (
		<Navbar className="navbar navbar-expand-lg navbar-dark bg-black" expand="true" style={{borderColor:'black', borderBlockColor:'#54B4D3'}}>
			<Container fluid className="ml-4">
				<Navbar.Brand as={Link} to="/">
					Winx Club
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
					<Nav>
						<img src={prop.pp} className="img-style" />
						<NavDropdown title={user} id="collasible-nav-dropdown" align={"end"}>
							<NavDropdown.Item as={Link} to={`/profile/${user}`}> Profile</NavDropdown.Item>
							<NavDropdown.Item as={Link} to="/settings"> Settings</NavDropdown.Item>
							<NavDropdown.Item onClick={handleSignOut}>Log Out</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}