import { Container, CardGroup, Row, Col, Button, Offcanvas, Image } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import React, { useState, useEffect } from 'react';
import api from "../api";
import { getPP } from './Main';
import { User } from '../interfaces/user';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';
import "./Profile.css";

const App: React.FC = () => {
	const [pp, setPP] = useState('');
	const [user, setUser] = useState<User>();
	const [matches, setMatches] = useState([]);
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
			const response = await api.get('/match-histories');
			console.log(response.data);
			if (response.data.length !== 0)
				setMatches(response.data);
		}
		fetchData();
	}, [])

	const imageData = [
		{ id: 1, src: { pp }, alt: 'Image 1' },
		{ id: 2, src: { pp }, alt: 'Image 2' },
		{ id: 3, src: { pp }, alt: 'Image 3' },
		{ id: 4, src: { pp }, alt: 'Image 4' },
		{ id: 5, src: { pp }, alt: 'Image 5' },
		{ id: 6, src: { pp }, alt: 'Image 6' },
	];
	return (
		<Container>
			<div className="main-body">
				<Row>
					<Col lg="4">
						<Card>
							<Card.Body>
								<div className="d-flex flex-column align-items-center text-center">
									<Image src={pp} className="rounded-circle p-1 bg-primary" width="110" />
									<div className="mt-3">
										<h4>{user?.FirstName} {user?.LastName}</h4>
										<p className="text-secondary mb-1">{user?.Login}</p>
										<p className="text-muted font-size-sm">{user?.Email}</p>
										<Button bsPrefix="btn btn-outline-danger">Follow</Button>
										<Button bsPrefix="btn btn-outline-primary">Message</Button>
									</div>
								</div>
								<hr className="my-4" />
								<Row>
									{imageData.map((image) => (
										<Col key={image.id} lg={4} md={6} sm={12}>
											<Card className="mb-4">
												<Card.Img variant="top" src={pp} />
											</Card>
										</Col>
									))}
								</Row>
							</Card.Body>
						</Card>
					</Col>
					<Col lg='8'>
						<Table bsPrefix='table table-hover'>
							<thead>
								<tr>
									<th>#</th>
									<th>First Name</th>
									<th>Last Name</th>
									<th>Email</th>
								</tr>
							</thead>
							<tbody>
								<tr className='table-danger'>
									<td>1</td>
									<td>John</td>
									<td>Doe</td>
									<td>john@example.com</td>
								</tr>
								<tr className='table-primary'>
									<td>2</td>
									<td>Jane</td>
									<td>Smith</td>
									<td>jane@example.com</td>
								</tr>
								{/* Diğer satırları buraya ekleyin */}
							</tbody>
						</Table>
					</Col>
				</Row>
			</div>
		</Container>
	);
}

export default App;