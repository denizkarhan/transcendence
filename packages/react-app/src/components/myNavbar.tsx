import React, { Fragment, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown, Stack, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import { useAuthUser, useSignOut } from "react-auth-kit";
import api from '../api';
import { getPP } from './Main';
import { useToast } from "./Toast";


interface Props {
	pp: string,
	setPP: React.Dispatch<React.SetStateAction<string>>,
}

export default function MyNavbar(prop: Props) {
	const signOut = useSignOut();
	const auth = useAuthUser();
	const { showError, showSuccess } = useToast();
	const navigate = useNavigate();


	const user = auth()?.username ?? "User";
	const handleSignOut = async () => {
		await api.get("auth/logout");
		signOut();
	};

	const onSubmit = async (event: any) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const formValues = Object.fromEntries(formData.entries());
		await api.get('/users/username/' + formValues.query)
		.then((response:any) => {
			console.log(response);
			if (response.status === 200)
			{
				navigate('/profile/' + response.data.Login);
				return;
			}
			else
				showError('Could not find a user with that name');
		})
		.catch((err:any) => { showError('Could not find a user with that name');});
		// showError('Could not find a user with that name');
	}

	useEffect(() => {
		const fetchData = async () => {
			prop.setPP(await getPP(undefined));
		};
		fetchData();
	}, []);
	return (
		<Navbar className="navbar navbar-expand-lg navbar-dark bg-black" expand="true" style={{ borderColor: 'black', borderBlockColor: '#54B4D3' }}>
			<Container fluid className="ml-4">
				<Navbar.Brand as={Link} to="/">
					Winx Club
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse style={{ justifyContent: 'flex-end' }}>
					<Stack direction='horizontal' gap={2}>
						<Nav.Item className='btn btn-outline-primary' as={Link} to='/game'> Game </Nav.Item>
						<Nav.Item className='btn btn-outline-primary' as={Link} to='/chat'> Chat </Nav.Item>
					</Stack>
				</Navbar.Collapse>
				<Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
					<Form
						onSubmit={onSubmit}
					>
						<Form.Control type="text" name="query" placeholder="Search for a user" />
					</Form>
					<i className="bi bi-search"></i>
					<Nav>
						<img src={prop.pp} className="img-style" />
						<NavDropdown title={user} id="collasible-nav-dropdown" align={"end"}>
							<NavDropdown.Item as={Link} to={`/profile/${user}`}> Profile</NavDropdown.Item>
							<NavDropdown.Item onClick={handleSignOut}>Log Out</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}