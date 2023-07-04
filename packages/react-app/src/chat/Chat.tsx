import { Button, Card, Col, Container, Overlay, OverlayTrigger, Row, Stack, Tab, Tabs, Tooltip } from "react-bootstrap";
import io, { Socket } from 'socket.io-client';
import { getCookie } from "../api";
import { useEffect, useRef, useState } from "react";
import { Chat } from "../interfaces/chat";
import { useAuthUser } from "react-auth-kit";
import "./chat.css";
import UserChat from "./userChat";
import ChatBox from "./ChatBox";
import CreateChat from "./createChat";
import { useToast } from "../components/Toast";
import SendMessage from "./SendMessage";
import JoinRoom from "./join";
import { Room } from "../interfaces/room";
import { Message } from "../interfaces/message";
import ChatFriend from "./ChatFriend";
import ChatBoxHeader from "./ChatBoxHeader";



function ChatService() {
	const { showError, showSuccess } = useToast();
	const URL = "http://10.12.13.1:3001/chat";
	const auth = useAuthUser();
	const socketRef = useRef<any>(null);
	const newSocket = socketRef.current as Socket;

	const user = auth()?.username ?? "User";
	const [rooms, setRooms] = useState<Room[]>([]);
	const [publicRoom, setPulic] = useState<Room[]>([]);
	const [room, setRoom] = useState<Room | null>(null);
	useEffect(() => {
		const socket = io(URL, {
			auth: {
				nick: getCookie("42_auth_state"),
				token: getCookie("42_auth")
			},
		});

		socket.emit('getData', { userName: user });

		socket.on('getData', (data: Room[]) => {
			console.log(data);
			setRooms(data);
		});

		socket.emit('getPublic');
		socket.on('getPublic', (data: Room[]) => {
			setPulic(data);

		})

		socket.on('createRoom', (data: Room) => {
			console.log(data);
			setRooms(prevData => {
				let isDataExists = false;
				for (let i = 0; i < prevData.length; i++) {
					if (prevData[i].RoomName === data.RoomName) {
						isDataExists = true;
						break;
					}
				}
				if (isDataExists) {
					return prevData;
				}
				return [...prevData, data];
			});
			setRoom(data);
		});

		socket.on('ErrorHandle', (data: any) => {
			showError(data.message);
		})

		socket.on('isJoin', (data: any) => {
			console.log(data);
		})

		socket.on('receiveMessage', (data: any) => {
			setRooms(prevRooms => {
				const updatedRooms = prevRooms.map(room => {
					if (room.RoomName === data.RoomName) {
						data.RoomName = null;
						const updatedRoom = { ...room };
						updatedRoom.Messages.push(data.Message);
						return updatedRoom;
					}
					return room;
				});
				return updatedRooms;
			});
		});

		socketRef.current = socket;

		return () => {
			socket.off('getData');
			socket.off('getPublic');
			socket.off('createRoom');
			socket.off('ErrorHandle');
			socket.off('isJoin');
			socket.off('receiveMessage');
			socket.disconnect();
		};
	}, [])

	const joinRoom = (room: any) => {
		setRoom({ ...room });
		newSocket.emit('join', { ...room, UserName: user });
	}
	const [activeTab, setActiveTab] = useState('messages');

	const handleTabSelect = (tab: string | null): void => {
		if (tab) {
			setActiveTab(tab);
		}
	};

	const renderTooltip = (message: string) => (
		<Tooltip id="hover-tooltip">
			{message}
		</Tooltip>
	);

	const overlay = (
		<Overlay
			show={true} // Overlay'in görünür olmasını sağlar
			placement="top" // Overlay'in pozisyonunu belirler
			target={document.querySelector('#tabs-container')} // Overlay'in hedefini belirler (Tablar konteynerine göre ayarlanmalıdır)
		>
			<Tooltip>
				{renderTooltip('Tooltip Message')}
			</Tooltip>
		</Overlay>
	);

	const [showCanvas, setShowCanvas] = useState(false);

	const handleToggleCanvas = () => {
		setShowCanvas(!showCanvas);
	};

	return (

		<Container fluid className="custom-container" style={{ marginTop: '1%' }}>
			<Row style={{ height: '80vh' }}>
				<Col md={6} lg={5} xl={4} className="mb-4 mb-md-0">
					<Card className="mask-custom" style={{ height: '100%' }}>
						<Card.Body>
							<Tabs activeKey={activeTab} onSelect={handleTabSelect} fill style={{ color: 'black', height: '3.5rem' }} className="border-0">
								<Tab eventKey="messages" title={
									<OverlayTrigger
										placement="top"
										overlay={renderTooltip('Messages')}
									>
										<i className="bi bi-chat-left fs-4"></i>
									</OverlayTrigger>
								}>
									<Stack direction="horizontal" className="mb-0 custom-stack" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
										{rooms?.map((chat: Room, index) => {
											return (
												<div style={{ width: '100%' }} key={index} onClick={() => joinRoom(chat)}>
													<UserChat chat={chat} user={user} />
												</div>
											);
										})}
									</Stack>
								</Tab>
								<Tab eventKey="createRoom" title={
									<OverlayTrigger
										placement="top"
										overlay={renderTooltip('Create Room')}
									>
										<i className="bi bi-plus-square fs-4"></i>
									</OverlayTrigger>
								}>
									<Stack className="custom-satck" style={{
										height: '100%', display: 'flex',
										flexDirection: 'column',
										justifyContent: 'flex-end',
										alignItems: 'stretch',
										flexWrap: 'wrap'
									}}>
										<CreateChat socket={newSocket} user={user} />
									</Stack>
								</Tab>
								<Tab eventKey="joinRoom" title={
									<OverlayTrigger
										placement="top"
										overlay={renderTooltip('Join Room')}
									>
										<i className="bi bi-door-open fs-4"></i>
									</OverlayTrigger>
								}>
									<Stack className="custom-satck" style={{
										height: '100%', display: 'flex',
										flexDirection: 'column',
										justifyContent: 'flex-end',
										alignItems: 'stretch',
										flexWrap: 'wrap'
									}}>
										<JoinRoom socket={newSocket} user={user} />
									</Stack>
								</Tab>
								<Tab eventKey="privateMessage" title={
									<OverlayTrigger
										placement="top"
										overlay={renderTooltip('Private Messages')}
									>
										<i className="bi bi-incognito fs-4"></i>
									</OverlayTrigger>
								}>
									<Stack className="custom-satck">
										<ChatFriend socket={newSocket} user={user} key='friends' setActiveTab={setActiveTab} setRoom={setRoom} />
									</Stack>
								</Tab>
								<Tab eventKey="publicRoom" title={
									<OverlayTrigger
										placement="top"
										overlay={renderTooltip('Public Rooms')}
									>
										<i className="bi bi-p-square fs-4"></i>
									</OverlayTrigger>
								}>
									<Stack className="custom-satck">
										{publicRoom?.map((chat: Room, index) => {
											return (
												<div style={{ width: '100%' }} key={index} onClick={() => joinRoom(chat)}>
													<UserChat chat={chat} user={user} />
												</div>
											);
										})}
									</Stack>
								</Tab>
							</Tabs>
						</Card.Body>
					</Card>
				</Col>
				<Col md="6" lg="7" xl="8">
					<Card className="mask-custom" style={{ height: '100%' }}>
						<ChatBoxHeader user={user} room={room} />
						<Card.Body className="custom-card-body">
							<ChatBox key="ChatBox" room={room} user={user} />
						</Card.Body>
						<Card.Footer>
							<SendMessage key='sendMessage' room={room} socket={newSocket} user={user} />
						</Card.Footer>
					</Card>
				</Col>
			</Row>
		</Container >



	);
}

export default ChatService;
