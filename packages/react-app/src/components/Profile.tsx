import { Container, Row, Col, Button, Offcanvas, Image } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import React, { useState, useEffect } from 'react';
import api from "../api";
import { getPP } from './Main';
import { User } from '../interfaces/user';

const App: React.FC = () => {
	const [pp, setPP] = useState('');
	const [user, setUser] = useState<User>();
	useEffect(() => {
		const fetchData = async () => {
			setPP(await getPP());
		}
		fetchData();
	}, []);
	useEffect(() => {
		const fetchData = async () => {
			await api.get('/users/profile').then((response: any) => {
				setUser({
					FirstName: response?.data.FirstName, LastName: response?.data.LastName,
					Email: response?.data.Email, Login: response?.data.Login,
					Status: response?.data.Status
				});
			}).catch();
		}
		fetchData();
	}, [])
	return (
		<Container fluid>
			<Row>
				<Col xs={3} style={{ height: '95vh', padding:'0' }}>
					<Card style={{ height: '95vh' }}>
						<Card.Body>
							<Card.Title>Başlık</Card.Title>
							<Card.Text>
								İçerik metni
							</Card.Text>
						</Card.Body>
						<Card.Footer>Burası Ayak</Card.Footer>
					</Card>
				</Col>
				<Col xs={9} style={{ backgroundColor: 'blue', height: '95vh' }}>
					<Row >
						<Col>
							
						</Col>
					</Row>
					<Row >
						<Col>
							
						</Col>
					</Row>
				</Col>
			</Row>
		</Container >
	);
}

export default App;
//className="h-50"
{/* <div className="vh-100" style={{ backgroundColor: '#9de2ff' }}>
		 	<Container>
		 		<Row className="justify-content-center">
		 			<Col md="9" lg="7" xl="5" className="mt-5">
		 				<Card style={{ borderRadius: '15px' }}>
		 					<Card.Body className="p-4">
		 						<div className="d-flex text-black">
		 							<div>
		 								<Card.Img style={{ width: '180px', borderRadius: '10px' }} alt='Generic placeholder image' src={pp} />
		 							</div>
		 							<div>
		 								<Card.Title>{user?.FirstName} {user?.LastName}</Card.Title>
		 								<Card.Text>{user?.Login}</Card.Text>
		 								<div className="d-flex justify-content-start rounded-3 p-2 mb-2"
		 									style={{ backgroundColor: '#efefef' }}>
		 									<div>
		 										<p className="small text-muted mb-1">Articles</p>
		 										<p className="mb-0">41</p>
		 									</div>
		 									<div className="px-3">
		 										<p className="small text-muted mb-1">Followers</p>
		 										<p className="mb-0">976</p>
		 									</div>
		 									<div>
		 										<p className="small text-muted mb-1">Rating</p>
		 										<p className="mb-0">8.5</p>
		 									</div>
		 								</div>
		 								<div className="d-flex pt-1">
		 									<Button className="me-1 flex-grow-1">Chat</Button>
		 									<Button className="flex-grow-1">Follow</Button>
		 								</div>
		 							</div>
		 						</div>
		 					</Card.Body>
		 				</Card>
		 			</Col>
		 		</Row>
		 	</Container>
		 </div> */}