import React, { useState } from 'react';
import { Button, Form, Modal, } from 'react-bootstrap';
import api, { deleteCookie, getCookie } from '../api';
import jwtDecode from 'jwt-decode';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { useToast } from './Toast';
interface decodedToken {
	id: number,
	Login: string,
	exp: number,
	iat: number
};
interface ModalComponentProps {
	show: boolean;
	onHide: () => void;
}
export default function ({ show, onHide }: ModalComponentProps) {
	const showError = useToast().showError;
	const user = getCookie("user");
	const signin = useSignIn();
	const navigate = useNavigate();
	const [code, setCode] = useState();
	const handleSubmit = async (event: any) => {
		if (code) {
			event.preventDefault();
			await api.get(`/authanticator/verify/${code}/${user}`).then((response:any) => {
				const user = jwtDecode<decodedToken>(response.data.access_token);
				signin({
					token: response.data.access_token,
					tokenType: "Bearer",
					expiresIn: 9999,
					authState: { username: user.Login }
				});
				deleteCookie('user');
				navigate('/');
			}).catch((error: any) => showError(error.response?.data.message));
		}
		else
			showError("Boş Olamaz")
	};
	return (
		<>
			<Modal centered size='sm' show={show} backdrop="static" onHide={onHide} keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Enter Verification Code</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
							<Form.Control required type="text" pattern="[0-9]*" placeholder='Code' onChange={(e:any) => setCode(e.target.value)} value={code} />
					</Form>
				</Modal.Body>
				<Modal.Footer style={{ display: 'flex', justifyContent: 'center' }}>
					<Button bsPrefix="btn btn-outline-primary" onClick={handleSubmit} style={{ width: '100%' }}> Verify </Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}