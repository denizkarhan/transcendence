import { Container, CardGroup, Row, Col, Button, Offcanvas, Image, Alert, Tabs, Tab } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import React, { useState, useEffect } from 'react';
import api, { getCookie } from "../api";
import { getPP } from './Main';
import { User } from '../interfaces/user';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';
import "./Profile.css";
import { Match } from '../interfaces/match';
import { format } from 'date-fns';
import Friends from './Friends';

interface Props {
	userName: string | null;
}

const App: React.FC<Props> = (username: Props) => {
	const [pp, setPP] = useState('');
	const [user, setUser] = useState<User>();
	const [matches, setMatches] = useState<Match[]>([]);
	const [activeTab, setActiveTab] = useState<string>('friends');

	const handleTabSelect = (tab: string | null): void => {
		if (tab) {
			setActiveTab(tab);
		}
	};
	useEffect(() => {
		const fetchData = async () => {
			setPP(await getPP());
		}
		fetchData();
	}, []);
	useEffect(() => {
		const fetchData = async () => {
			if (username.userName === '') {
				await api.get('/users/profile').then((response: any) => {
					setUser({
						FirstName: response?.data.FirstName, LastName: response?.data.LastName,
						Email: response?.data.Email, Login: response?.data.Login,
						Status: response?.data.Status
					});
				}).catch();
			}
			else{
				await api.get(`/users/userName/${username.userName}`).then((response: any) => {
					setUser({
						FirstName: response?.data.FirstName, LastName: response?.data.LastName,
						Email: response?.data.Email, Login: response?.data.Login,
						Status: response?.data.Status
					});
				}).catch();
			}
			const resMatch = await api.get('/match-histories');
			if (resMatch.data.length !== 0)
				setMatches(resMatch.data);
			
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
					<Col className=''>
						<Card>
							<Card.Body>
								<div className="d-flex flex-column align-items-center text-center">
									<Image src={pp} className='image-style' />
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
						<Tabs activeKey={activeTab} onSelect={handleTabSelect} className="mb-3" fill>
							<Tab eventKey="friends" title="Arkadaşlar">
								<Friends userName={username.userName} />
							</Tab>
							<Tab eventKey="matches" title="Maçlar">
								<div className="match-results-container">
									{matches.map((match) => (
										<Alert key={match?.Id} variant={match.MatchResult === 1 ? 'primary' : match.MatchResult === 0 ? 'info' : 'danger'}>
											<div className="d-flex justify-content-between align-items-center">
												<span>{user?.Login}</span>
												<span>{match.MyResult}</span>
												<span>{format(new Date(match.MatchDate.toString()), 'dd MMM')}</span>
												<span>{match.EnemyResult}</span>
												<span>{match.Enemy.Login}</span>
											</div>
										</Alert>
									))}
								</div>
							</Tab>
							<Tab eventKey="achievements" title="Başarımlar">
								{/* Başarımlar sekmesine ait içerik */}
							</Tab>
						</Tabs>
					</Col>
				</Row>
			</div>
		</Container>
	);
}

export default App;