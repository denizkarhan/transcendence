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



interface Props {
	pp: string,
	setPP: React.Dispatch<React.SetStateAction<string>>,
}

const App: React.FC<Props> = (props: Props) => {
	const navigate = useNavigate();
	const { username } = useParams<string>();
	const [user, setUser] = useState<User>();
	const [activeTab, setActiveTab] = useState<string>('friends');
	const auth = useAuthUser();

	const login = auth()?.username ?? "User";
	const handleTabSelect = (tab: string | null): void => {
		if (tab) {
			setActiveTab(tab);
		}
	};
	useEffect(() => {
		const fetchData = async () => {
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
	}, [username])

	return (
		<Container>
			<div className="main-body">
				<Row>
					<Col className=''>
						<Card>
							<Card.Body>
								<div className="d-flex flex-column align-items-center text-center">
									<ProfileImage key={username} userName={username} pp={props.pp} setPP={props.setPP} />
									<div className="mt-3">
										<h4>{user?.FirstName} {user?.LastName}</h4>
										<p className="text-secondary mb-1">{user?.Login}</p>
										<p className="text-muted font-size-sm">{user?.Email}</p>
										{username !== login ?
											<Stack direction="horizontal" className='justify-content-center' gap={2}>
												<Button bsPrefix="btn btn-outline-danger">Follow</Button>
												<Button bsPrefix="btn btn-outline-primary">Message</Button>
											</Stack> : <UpdateProfile />}
									</div>

								</div>
							</Card.Body>
						</Card>
					</Col>
					<Col lg='9'>
						<Tabs activeKey={activeTab} onSelect={handleTabSelect} className="mb-3" fill>
							<Tab eventKey="friends" title="Arkadaşlar">
								<Friends key={username} userName={username} />
							</Tab>
							<Tab eventKey="matches" title="Maçlar">
								<Matches key={username} userName={username} />
							</Tab>
							<Tab eventKey="achievements" title="Başarımlar">
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