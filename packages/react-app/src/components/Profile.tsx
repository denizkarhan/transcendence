import { Container, Row, Col } from 'react-bootstrap';
import axios, { AxiosResponse } from 'axios';
import Card from 'react-bootstrap/Card';
import React, {useState, useEffect} from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from "../api";
import { getPP } from './Main';

const onFinish = async (values: any) => {
	// console.log('Success:', values);
	const response: AxiosResponse = await api.get('/users/profile');
	console.log(response.data);
};



const App: React.FC = () => {
	const [pp, setPP] = useState('');
	useEffect(() => {
		const fetchData = async () => {
			setPP(await getPP());
		};

		fetchData();
	}, []);
	return (
		<div className="vh-100" style={{ backgroundColor: '#9de2ff' }}>
			<Container>
				<Row className="justify-content-center">
					<Col md="9" lg="7" xl="5" className="mt-5">
						<Card style={{ borderRadius: '15px' }}>
							<Card.Body className="p-4">
								<div className="d-flex text-black">
									<div className="flex-shrink-0">
										<Card.Img style={{ width: '180px', borderRadius: '10px' }} alt='Generic placeholder image' src={pp} />
									</div>
									<div>
										<Card.Title>Danny McLoan</Card.Title>
										<Card.Text>Senior Journalist</Card.Text>
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
		</div>
	);
}

export default App;
