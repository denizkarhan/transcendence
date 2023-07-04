import { Button, Form, ListGroup, Modal, Stack, Tab, Tabs } from "react-bootstrap";
import { ChatUser } from "../../interfaces/chatUser";
import { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { useToast } from "../../components/Toast";
import { useToastInvite } from "./inviteGame";

interface Props {
	users: ChatUser[];
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	show: boolean;
	socket: Socket;
	user: string;
	RoomName: string;
}



const ChatSettings = (props: Props) => {
	const toast = useToastInvite();
	const navigate = useNavigate();
	const { showError, showSuccess } = useToast();
	const [admin, setAdmin] = useState<string[]>([]);
	const [muted, setMuted] = useState<boolean>(false);
	const [isPasswordEntered, setIsPasswordEntered] = useState(false);

	useEffect(() => {
		const admins = props.users.filter(user => user.isAdmin).map(user => user.users.Login);
		setAdmin(admins);
	}, [props]);

	const handleKeyDown = (event: any) => {
		if (event.key === 'Escape') {
			props.setShowModal(false);
		}
	};

	const handleInvite = () => {
		toast.invite({ message: 'Hello', sender: 'John' });
	}

	const handlePasswordChange = (event:any) => {
		const password = event.target.value;
		setIsPasswordEntered(password !== ''); // Şifre alanı doluysa true, boş ise false
	  };
	
	const onSubmit = async (event: any) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const formValues = Object.fromEntries(formData.entries());
		Object.keys(formValues).forEach((key) => {
			if (formValues[key] === '') {
				delete formValues[key];
			}
		});
		const IsPublic = formValues.hasOwnProperty('IsPublic') && formValues['IsPublic'].toString() === 'on';
		if (formValues["RoomName"] && formValues["RoomName"].toString().at(0) !== '#')
			formValues["RoomName"] = "#" + formValues["RoomName"];
		props.socket.emit('updateRoom', { ...formValues, IsPublic: IsPublic, OldRoomName: props.RoomName, Admin: props.user, });
		props.setShowModal(false);
	}


	const handleDelete = () => {
		props.socket.emit("deleteRoom", { RoomName: props.RoomName });
	}

	const handleBlockUser = async (user: ChatUser) => {
		console.log(user);
		const response = await api.get(`/block-user/${user.users.Login}`);
		if (response.data.status === 200) {
			showSuccess(' is blocking');
		}
		else
			showError(response.data.messages);
		if (admin.find(username => username === props.user) !== undefined)
			props.socket.emit("deleteRoom", { RoomName: props.RoomName });
	}

	const handleKick = (username: string) => {
		if (admin.find(username => username === props.user) !== undefined)
			props.socket.emit('kick', { UserName: username, RoomName: props.RoomName });
	}

	const handleMute = (user: ChatUser) => {
		if (admin.find(username => username === props.user) !== undefined) {
			props.socket.emit('mute', { UserName: user.users.Login, RoomName: props.RoomName });
			setMuted(true);
		}
	}

	const handleUnMute = (user: ChatUser) => {
		if (admin.find(username => username === props.user) !== undefined) {
			props.socket.emit('unmute', { UserName: user.users.Login, RoomName: props.RoomName });
			setMuted(false);
		}
	}

	const [activeTab, setActiveTab] = useState('Users');

	const handleTabSelect = (tab: string | null): void => {
		if (tab) {
			setActiveTab(tab);
		}
	};

	return (
		<div className="modal-content">
			<Modal show={props.show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onEscapeKeyDown={handleKeyDown} style={{ border: '2px solid', borderColor: '#54B4D3' }}>
				<Modal.Header style={{ background: 'black', color: 'white', borderColor: '#54B4D3' }} onClick={() => props.setShowModal(false)}>
					<Modal.Title style={{ background: 'black', color: 'white' }} id="contained-modal-title-vcenter">
						Settings
					</Modal.Title>
					{admin.includes(props.user) ? <Button bsPrefix="btn btn-outline-info" onClick={handleDelete}><i className="bi bi-trash"></i></Button> : null}
				</Modal.Header>
				<Modal.Body style={{ background: 'black', color: 'white', height: '400px' }}>
					<Tabs activeKey={activeTab} onSelect={handleTabSelect} fill style={{ color: 'black', height: '3.5rem' }} className="border-0">

						<Tab eventKey="Users" title="Users">
							{props.users.map(user => (
								<div key={user.users.Login} style={{
									cursor: 'pointer',
									display: 'flex',
									alignItems: 'center',
									flexDirection: 'row',
									justifyContent: 'space-between',
									borderBottom: '1px solid',
									borderColor: '#54B4D3',
									height: '8vh'
								}}>
									<span onClick={() => navigate(`/profile/${user.users.Login}`)} style={{ width: '100%' }}>{user.users.Login}</span>
									<Stack key={user.users.Login} direction="horizontal" gap={2}>
										{user.users.Login !== props.user ? <Button onClick={() => handleBlockUser(user)} bsPrefix="btn btn-outline-info"><i className="bi bi-slash-circle"></i></Button> : null}{/*block user */}
										{admin.find(username => username === props.user) !== undefined && user.users.Login !== props.user ? <Button onClick={() => handleKick(user.users.Login)} bsPrefix="btn btn-outline-info"><i className="bi bi-box-arrow-right"></i></Button> : null}{/*kick user */}
										{admin.find(username => username === props.user) !== undefined && user.users.Login !== props.user ?
											(muted ? <Button onClick={() => handleUnMute(user)} bsPrefix="btn btn-outline-info"><i className="bi bi-volume-down"></i></Button>
												: <Button onClick={() => handleMute(user)} bsPrefix="btn btn-outline-info"><i className="bi bi-volume-mute"></i></Button>)
											: null}{/*mute user */}
										{user.users.Login !== props.user ? <Button onClick={handleInvite} bsPrefix="btn btn-outline-info" ><i className="bi bi-joystick"></i></Button> : null }
									</Stack>
								</div>
							))}
						</Tab>
						{props.RoomName[0] === '#' ?
							<Tab eventKey="Update Room" title="Update Room">
								<Form onSubmit={onSubmit}>
									<Form.Group controlId="RoomName">
										<Form.Label>Room Name</Form.Label>
										<Form.Control key='CreateRoom' type="text" name="RoomName" placeholder="Room Name" />
									</Form.Group>

									<Form.Group controlId="Password">
										<Form.Label>Password</Form.Label>
										<Form.Control key='CreatePass' type="password" name="Password" placeholder="Password"  onChange={handlePasswordChange}/>
									</Form.Group>
									<Form.Group controlId="IsPublic">
										<Form.Check
											type="switch"
											id="custom-switch"
											label="Public"
											name="IsPublic"
											disabled={isPasswordEntered}
										/>
									</Form.Group>
									<Button bsPrefix="btn btn-outline-primary" variant="primary" type="submit">
										Update
									</Button>
								</Form>
							</Tab> : null}
					</Tabs>
				</Modal.Body>
				<Modal.Footer style={{ background: 'black', color: 'white', border: 'none' }}></Modal.Footer>
			</Modal>
		</div>
	);
}

export default ChatSettings;