import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, Container, Form, Modal, Row, Stack } from 'react-bootstrap';
import api, { deleteCookie, getCookie } from '../api';
import jwtDecode from 'jwt-decode';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

interface decodedToken {
	id: number,
	Login: string,
	exp: number,
	iat: number
};

export default function Tfa() {
	const user = getCookie("user");
	const signin = useSignIn();
	const navigate = useNavigate();
	const [code, setCode] = useState('');
	const handleSubmit = async (event: any) => {
		event.preventDefault();
		await api.get(`/authanticator/verify/${code}/${user}`).then((response) => {
			const user = jwtDecode<decodedToken>(response.data.access_token);
			signin({
				token: response.data.access_token,
				tokenType: "Bearer",
				expiresIn: 9999,
				authState: { username: user.Login }
			});
			deleteCookie("user");
			navigate('/');
		}).catch((error) => console.log(error));
	};
	return (
		<div className="App">
			<Container className="d-flex flex-column justify-content-center align-items-center bg-black" style={{ height: '100vh', width: '25vh' }}>
				<Stack gap={3} direction="vertical" style={{ flexDirection: "column", alignSelf: "stretch", alignItems: "stretch" }}>
					<Card bsPrefix='card border-info bg-black' style={{ height: '25%' }}>
						<Card.Header><Badge bg="black"><h4>Enter Verification Code</h4></Badge></Card.Header>
						<div style={{ border: 'none', borderTop: '1px solid #54B4D3' }}></div>
						<Card.Body style={{height:"100%", display:"flex"}}>
							<Form style={{ flex:"1", height: '50%', width: '50%', alignSelf: 'center' }} onSubmit={handleSubmit}>
								<Row className='mb-3'>
									<Form.Control required type="text" pattern="[0-9]*" placeholder='Code' style={{ marginBottom: '2vh' }} onChange={(e) => setCode(e.target.value)} value={code} />
								</Row>
								<Row className='mb-3'>
									<Button bsPrefix="btn btn-outline-primary" type='submit'> Verify </Button>
								</Row>
							</Form>
						</Card.Body>
					</Card>
				</Stack>
			</Container>
		</div>
	);
}