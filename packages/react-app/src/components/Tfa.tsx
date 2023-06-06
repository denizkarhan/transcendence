import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, Container, Form, Modal, Row, Stack } from 'react-bootstrap';
import api from '../api';

const App: React.FC = () => {
	const [code, setCode] = useState('');
	const handleSubmit = async (event:any) => {
		event.preventDefault();
		await api.get(`/authanticater/verify/${code}`).then((response)=>{
			console.log(response);
		}).catch((error)=>console.log(error));
	};
	return (
		<div className="App">
			<Container className="d-flex flex-column justify-content-center align-items-center bg-black" style={{ height: '100vh', width: '25vh' }}>
				<Stack gap={3} direction="vertical" style={{ flexDirection: "column", alignSelf: "stretch", alignItems: "stretch" }}>
					<Card bsPrefix='card border-info bg-black' style={{ width: '18rem', height: '20vh' }}>
						<Card.Header><Badge bg="black"><h4>Enter Verification Code</h4></Badge></Card.Header>
						<div style={{ border: 'none', borderTop: '1px solid #54B4D3' }}></div>
						<Card.Body className="d-flex flex-column">
							<div className="flex-grow-1"></div>
							<Form style={{ height: '10vh', width:'15vh', alignSelf:'center' }} onSubmit={handleSubmit}>
								<Row className='mb-3'>
									<Form.Control type="text" pattern="[0-9]*" placeholder='Code' style={{ marginBottom: '2vh' }} onChange={(e) => setCode(e.target.value)} value={code} />
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

export default App;