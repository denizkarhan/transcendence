import React, { useState } from "react";
import { Container, Dropdown, Nav, Navbar, NavDropdown } from "react-bootstrap";
// import axios from "axios";
// import Container from "react-bootstrap/Container";
// import nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { UserTemplate } from "./Main";
// import "./Nav.css";



interface Props {
	logState: boolean;
	user: UserTemplate | null;
}

export default function MyNavbar(props: Props) {
	const linkStyle = {
		margin: "1rem",
		textDecoration: "none",
		color: "blue",
	};
	return (
		<Navbar className="navbar navbar-expand-lg navbar-dark bg-dark" expand="true">
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
		</Navbar>
		// 		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
		//   <div className="container-fluid">
		//     <a className="navbar-brand" href="#">Navbar</a>
		//     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
		//       <span className="navbar-toggler-icon"></span>
		//     </button>
		//     <div className="collapse navbar-collapse" id="navbarColor02">
		//       <ul className="navbar-nav me-auto">
		//         <li className="nav-item">
		//           <a className="nav-link active" href="#">Home
		//             <span className="visually-hidden">(current)</span>
		//           </a>
		//         </li>
		//         <li className="nav-item">
		//           <a className="nav-link" href="#">Features</a>
		//         </li>
		//         <li className="nav-item">
		//           <a className="nav-link" href="#">Pricing</a>
		//         </li>
		//         <li className="nav-item">
		//           <a className="nav-link" href="#">About</a>
		//         </li>
		//         <li className="nav-item dropdown">
		//           <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
		//           <div className="dropdown-menu">
		//             <a className="dropdown-item" href="#">Action</a>
		//             <a className="dropdown-item" href="#">Another action</a>
		//             <a className="dropdown-item" href="#">Something else here</a>
		//             <div className="dropdown-divider"></div>
		//             <a className="dropdown-item" href="#">Separated link</a>
		//           </div>
		//         </li>
		//       </ul>
		//     </div>
		//   </div>
		// </nav>

		// <Navbar bg="light" expand="lg">
		//   <Container>
		//     <Link to="/home" className="navbar-brand">
		//       Winx Club
		//     </Link>
		//     <Navbar.Toggle aria-controls="basic-navbar-nav" />
		//     <Navbar.Collapse id="basic-navbar-nav">
		//       <Nav className="">
		//         <Link style={linkStyle} type="" to="home">
		//           Home
		//         </Link>
		//         <Link style={linkStyle} to="login">
		//           Sign in
		//         </Link>
		//         <Link style={linkStyle} to="register">
		//           Sign up
		//         </Link>
		//       </Nav>
		//       <Nav className="">
		//         <Dropdown>
		//           <Dropdown.Toggle variant="primary" id="dropdown-basic">
		//             User
		//           </Dropdown.Toggle>
		//           <Dropdown.Menu>
		//             <Dropdown.Item>
		//               <Link style={linkStyle} to="profile">
		//                 Profile
		//               </Link>
		//             </Dropdown.Item>
		//             <Dropdown.Item>
		//               <Link style={linkStyle} to="logout">
		//                 Log out
		//               </Link>
		//             </Dropdown.Item>
		//             <Dropdown.Item>
		//               <Link style={linkStyle} to="settings">
		//                 Settings
		//               </Link>
		//             </Dropdown.Item>
		//           </Dropdown.Menu>
		//         </Dropdown>
		//       </Nav>
		//       <Nav className=""></Nav>
		//     </Navbar.Collapse>
		//   </Container>
		// </Navbar>
	);
}
