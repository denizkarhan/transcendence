import { Container, Form, Modal, Button, ToggleButton } from 'react-bootstrap';
import api from '../api';
import { useEffect, useState } from 'react';
import { useAuthUser, useSignIn, useSignOut } from 'react-auth-kit';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { User } from '../interfaces/user';
import QrCode from './profile/QrCode';


function delay(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

interface decodedToken {
	id: number,
	Login: string,
	exp: number,
	iat: number
};

interface Props {
	setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

export default function UpdateProfile(props: Props) {
	const auth = useAuthUser();
	const [checked, setChecked] = useState(false);
	const [showQR, setShowQR] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [show, setShow] = useState(false);
	const signin = useSignIn();
	const signout = useSignOut();
	const navigate = useNavigate();
	const user = auth()?.username ?? "User";

	const onSubmit = async (event: any) => {
		event.preventDefault();

		const formData = new FormData(event.target);
		const formValues = Object.fromEntries(formData.entries());
		Object.keys(formValues).forEach((key) => {
			if (formValues[key] === '') {
				delete formValues[key];
			}
		});
		await api.post('users/update', formValues)
			.then((response: any) => {
				if (response.data.access_token) {
					const user = jwtDecode<decodedToken>(response.data.access_token);
					signout();
					signin({
						token: response.data.access_token,
						tokenType: "Bearer",
						expiresIn: 9999999,
						authState: { username: user.Login }
					});
					handleClose();
					navigate(`/profile/${user.Login}`);
					return;
				}
			})
			.catch((error) => console.log(error));
		if (checked) {
			setShowQR(true);
		}
		else {
			handleClose();
		}
		// console.log(show);
	}
	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	const handleClose = async () => { setShow(!show); setShowQR(false) };

	const handleShow = () => setShow(true);
	// console.log(show);
	return (
		<Container
			style={{ position: 'relative' }}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div onClick={handleShow} style={{width:'100%'}}>
				<i className="bi bi-gear fs-4" style={{ color: isHovered ? '#E4A11B' : '#332D2D', width: '100%' }} ></i>
			</div>
			<Modal
				show={show}
				onHide={handleClose}
			>
				<Modal.Header closeButton>
					<Modal.Title>Change your info</Modal.Title>
				</Modal.Header>
				<Form
					onSubmit={onSubmit}>
					<Modal.Body style={{ justifyContent: 'space-around', display: 'flex', flexWrap: 'wrap' }}>
						<Form.Label>
							New First Name:
							<Form.Control type="text" name="FirstName" placeholder="First Name" />
						</Form.Label>
						<Form.Label>
							New Last Name:
							<Form.Control type="text" name="LastName" placeholder="Last Name" />
						</Form.Label>
						<Form.Label>
							New Username:
							<Form.Control type="text" name="Login" placeholder="Username" />
						</Form.Label>
						<Form.Label>
							New Email:
							<Form.Control type="text" name="Email" placeholder="Email" />
						</Form.Label>
						<ToggleButton
							className="mb-2"
							id="toggle-check"
							type="checkbox"
							variant="outline-primary"
							checked={checked}
							value="1"
							onChange={(e) => setChecked(e.currentTarget.checked)}
						>
							Check to Enable Two Factor Authentication
						</ToggleButton>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="primary" type="submit">
							Updates
						</Button>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
			{showQR && <QrCode show={showQR} setShow={setShowQR} />}
		</Container >
	);
}