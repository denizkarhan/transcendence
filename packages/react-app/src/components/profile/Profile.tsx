import { Container, Row, Col, Button, Tabs, Tab, Stack } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import React, { useState, useEffect } from 'react';
import api from "../../api";
import { User } from '../../interfaces/user';
import "./Profile.css";
import Friends from './Friends';
import Matches from './Match';
import { useNavigate, useParams } from 'react-router-dom';
import Achievements from './Achievements';
import { useAuthUser } from 'react-auth-kit';
import ProfileImage from './ProfileImage';
import UpdateProfile from '../UpdateProfile';
import Followers from './Followers';
import ProfileButton from './ProfileButton';
import { isBlock } from '../Main';
import Block from './Block';
import "./Profile.css"
import { Match } from '../../interfaces/match';

interface Props {
	pp: string,
	setPP: React.Dispatch<React.SetStateAction<string>>,
}

const App: React.FC<Props> = (props: Props) => {
	const [wins, setWins] = useState<number>(0);
	let { username } = useParams<string>();
	const navigate = useNavigate();
	const [user, setUser] = useState<User>();
	const [activeTab, setActiveTab] = useState<string>('friends');
	const auth = useAuthUser();

	const login = auth()?.username ?? "User";
	const handleTabSelect = (tab: string | null): void => {
		if (tab) {
			setActiveTab(tab);
		}
	};
	username = (username === undefined) ? login : username;


	useEffect(() => {
		const fetchData = async () => {
			const resMatch = await api.get(`/match-histories/${username}`);
			const matches: Match[] = resMatch.data;
			let winsCount = 0; // Initialize a counter for wins

			if (resMatch.data.length !== 0) {
				matches.forEach((match) => {
					if (match.MyResult > match.EnemyResult) {
						winsCount++; // Increment the counter for each win
					}
				});
			}

			setWins(winsCount);
			const block = await isBlock(username, login);
			if (block) {
				navigate('/');
				return;
			}
			try {
				const response = await api.get(`/users/userName/${username}`);
				setUser({
					FirstName: response?.data.FirstName, LastName: response?.data.LastName,
					Email: response?.data.Email, Login: response?.data.Login,
					Status: response?.data.Status
				})
			} catch (error: any) {
				navigate('/404');
			}
		}
		fetchData();
	}, [username]);

	useEffect(() => {
		setWins(0);
	}, [username]);	

	return (
		<Container style={{ maxWidth: '70%' }}>
			<div className="main-body">
				<Row>
					<Col>
						<Card style={{ background: 'black', borderColor: '#54B4D3', borderBlockColor: '#54B4D3', color: 'white' }}>
							<Card.Body>
								<div style={{ position: 'absolute', right: '1rem' }}>
									<Block key={username} userName={username} />
								</div>
								<div className="d-flex flex-column align-items-center text-center">
									<ProfileImage key={username} userName={username} pp={props.pp} setPP={props.setPP} />
									<div className="mt-3">
										<h4>{user?.FirstName} {user?.LastName}</h4>
										<p className="mb-1">{user?.Login}</p>
										<p className="font-size-sm">{user?.Email}</p>
										<i className="bi bi-trophy"> Wins {wins}</i>
									</div>
									<Stack direction="horizontal" className="justify-content-center" gap={2}>
										<ProfileButton key={username} friendName={username} setUser={setUser} />
									</Stack>
								</div>
							</Card.Body>
						</Card>
					</Col>
					<Col lg='9'>
						<Tabs activeKey={activeTab} onSelect={handleTabSelect} className="mb-3" fill>
							<Tab eventKey="friends" title="Follow">
								<Friends key={username} userName={username} />
							</Tab>
							<Tab eventKey="follower" title="Follower">
								<Followers key={username} userName={username} />
							</Tab>
							<Tab eventKey="matches" title="Matches">
								<Matches key={username} userName={username} />
							</Tab>
							<Tab eventKey="achievements" title="Achievements">
								<Achievements key={username} userName={username} />
							</Tab>
						</Tabs>
					</Col>
				</Row>
			</div>
		</Container>
	);
}

export default App;