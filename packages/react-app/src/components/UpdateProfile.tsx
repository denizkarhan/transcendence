import { Container, Form, Modal, Button } from 'react-bootstrap';
import api from '../api';
import { useState } from 'react';
import { useSignIn, useSignOut } from 'react-auth-kit';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { getProfile } from './profile/Profile';
import { User } from '../interfaces/user';

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
	const [isHovered, setIsHovered] = useState(false);
	const signin = useSignIn();
	const signout = useSignOut();
	const navigate = useNavigate();

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
				if (response.data.access_token){
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
				}
			})
			.catch((error) => console.log(error));
		handleClose();
	}
	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};
	const [show, setShow] = useState(false);

	const handleClose = async () => {
		try {
			const response = await getProfile();
			props.setUser({
				FirstName: response?.data.FirstName, LastName: response?.data.LastName,
				Email: response?.data.Email, Login: response?.data.Login,
				Status: response?.data.Status
			})
			setShow(false);
		} catch (error: any) {
			navigate('/404');
		}
	};
	const handleShow = () => setShow(true);

	return (
		<Container
			style={{ position: 'relative' }}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<i className="bi bi-gear fs-4" style={{ color: isHovered ? '#E4A11B' : '#332D2D' }} onClick={handleShow}></i>
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
					</Modal.Body>
					<Modal.Footer>
						<Button variant="primary" type="submit">
							Update
						</Button>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</Container>
	);
}