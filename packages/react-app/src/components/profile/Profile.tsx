import { Container, Row, Col, Button, Image, Tabs, Tab, Stack } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import React, { useState, useEffect } from 'react';
import api from "../../api";
import { getPP, getUserName } from '../Main';
import { User } from '../../interfaces/user';
import "./Profile.css";
import Friends from './Friends';
import Matches from './Match';
import { useParams } from 'react-router-dom';
import Achievements from './Achievements';
import Settings from '../Settings';

interface Props {
	pp: string,
	setPP: React.Dispatch<React.SetStateAction<string>>,
}


const App: React.FC = () => {
	const { username } = useParams<string>();
	const [pp, setPP] = useState('');
	const [user, setUser] = useState<User>();
	const [activeTab, setActiveTab] = useState<string>('friends');

	const handleTabSelect = (tab: string | null): void => {
		if (tab) {
			setActiveTab(tab);
		}
	};
	useEffect(() => {
		const fetchData = async () => {
			setPP(await getPP(username));
		}
		fetchData();
	}, [username]);
	useEffect(() => {
		const fetchData = async () => {
			if (username === null) {
				await api.get('/users/profile').then((response: any) => {
					setUser({
						FirstName: response?.data.FirstName, LastName: response?.data.LastName,
						Email: response?.data.Email, Login: response?.data.Login,
						Status: response?.data.Status
					});
				}).catch();
			}
			else {
				await api.get(`/users/userName/${username}`).then((response: any) => {
					setUser({
						FirstName: response?.data.FirstName, LastName: response?.data.LastName,
						Email: response?.data.Email, Login: response?.data.Login,
						Status: response?.data.Status
					});
				}).catch();
			}
		}
		fetchData();
	}, [username])
	return (
		<Container>
			<div className="main-body">
				<Row>
					<Col className=''>
						<Card>
							<Card.Body>
								<div className="d-flex flex-column align-items-center text-center">
									<Image src={pp} className='image-style' />
									<div className="mt-3">
										<h4>{user?.FirstName} {user?.LastName}</h4>
										<p className="text-secondary mb-1">{user?.Login}</p>
										<p className="text-muted font-size-sm">{user?.Email}</p>
										{ username !== getUserName() ?
										<Stack direction="horizontal" className='justify-content-center' gap={2}>
											<Button bsPrefix="btn btn-outline-danger">Follow</Button>
											<Button bsPrefix="btn btn-outline-primary">Message</Button>
										</Stack> : null}
									</div>
								</div>
							</Card.Body>
						</Card>
					</Col>
					<Col lg='9'>
						<Tabs activeKey={activeTab} onSelect={handleTabSelect} className="mb-3" fill>
							<Tab eventKey="friends" title="Arkadaşlar">
								<Friends userName={username} />
							</Tab>
							<Tab eventKey="matches" title="Maçlar">
								<Matches userName={username}/>
							</Tab>
							<Tab eventKey="achievements" title="Başarımlar">
								<Achievements userName={username} />
							</Tab>
						</Tabs>
					</Col>
				</Row>
			</div>
		</Container>
	);
}

export default App;