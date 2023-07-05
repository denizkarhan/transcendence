import { Button, Card, Col, Container, Overlay, OverlayTrigger, Row, Stack, Tab, Tabs, Tooltip } from "react-bootstrap";
import io, { Socket } from 'socket.io-client';
import api, { getCookie } from "../api";
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
import { useNavigate, useParams } from "react-router-dom";
import { useToastInvite } from "./chatUtils/inviteGame";


function ChatService() {
	const navigate = useNavigate();
	const { friendname } = useParams<string>();
	const { showError, showSuccess } = useToast();
	const URL = "http://k2m13s05.42kocaeli.com.tr:3001/chat";
	const auth = useAuthUser();
	const socketRef = useRef<any>(null);
	const newSocket = socketRef.current as Socket;

	const user = auth()?.username ?? "User";
	const [rooms, setRooms] = useState<Room[]>([]);
	const [publicRoom, setPublic] = useState<Room[]>([]);
	const [room, setRoom] = useState<Room | null>(null);
	const [activeTab, setActiveTab] = useState('messages');

	const handleTabSelect = (tab: string | null): void => {
		if (tab) {
			setActiveTab(tab);
		}
	};
	

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
			setPublic(data);
		})

		socket.on('success', (data: any) => {
			showSuccess(data.Message);
		})

		socket.on('getPublicAddOne', (data: Room) => {
			setPublic(prevData => {
				return [data, ...prevData];
			});
		})

		socket.on('createRoom', (data: Room) => {
			setRooms(prevData => {
				setPublic(prevPublic => {
					const isDataExists = prevData.find(room => room.RoomName === data.RoomName) !== undefined ? true : false;
					const index = prevPublic.findIndex(room => room.RoomName === data.RoomName);
					if (index !== -1)
						prevPublic.splice(index, 1);
					if (isDataExists && data.IsPublic) {
						return [data, ...prevPublic];
					}
					else if (isDataExists && !data.IsPublic) {
						return prevPublic;
					}
					else if (!isDataExists && data.IsPublic)
						return [data, ...prevPublic];
					return prevPublic;
				});
				const index = prevData.findIndex(room => room.RoomName === data.RoomName);
				if (index !== -1)
					prevData.splice(index, 1);
				return [data, ...prevData];
			});
			setRoom(data);
			setActiveTab('messages');
		});

		socket.on("updatePublic", (data: any) => {
			const { OldRoomName, ...newRoom } = data;
			setPublic(prevPublic => {
				const index = prevPublic.findIndex(room => room.RoomName === data.RoomName);
				if (index !== -1)
					prevPublic.splice(index, 1);
				if (newRoom.IsPublic)
					return [newRoom, ...prevPublic];
				else if (!newRoom.IsPublic) {
					return prevPublic;
				}
				return prevPublic;
			});
		})

		socket.on("updateRoom", (data: any) => {
			const { OldRoomName, KickUser, ...newRoom } = data;
			setRooms(prevData => {
				const index = prevData.findIndex(room => room.RoomName === OldRoomName);
				if (index !== -1)
					prevData.splice(index, 1);
				if (KickUser !== undefined && user === KickUser)
					return prevData;
				else
					return [newRoom, ...prevData];
			});
			if (KickUser !== undefined && user === KickUser)
				setRoom(null);
			else
				setRoom(newRoom);
		})

		socket.on('ErrorHandle', (data: any) => {
			showError(data.message);
		})

		socket.on("deleteRoom", (data: Room) => {
			setRoom(null);
			setRooms(prevData => {
				const index = prevData.findIndex(room => room.RoomName === data.RoomName);
				if (index !== -1)
					prevData.splice(index, 1);
				return prevData;
			});
			if (data.IsPublic) {
				setPublic(prevPublic => {
					const index = prevPublic.findIndex(room => room.RoomName === data.RoomName);
					if (index !== -1)
						prevPublic.splice(index, 1);
					return prevPublic;
				});
			}
		})

		socket.on('ErrorHandle', (data: any) => {
			showError(data.message);
		})
		
		socket.on('receiveMessage', (data: any) => {
			setRooms(prevRooms => {
				const index = prevRooms.findIndex(room => room.RoomName === data.RoomName);
				if (index === -1)
				{
					socket.emit('getData', { userName: user });
					return prevRooms;
				}
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

		if (friendname !== undefined) {
			socket.emit('createPrivMessage', { Sender: user, Receiver: friendname });
		}

		socket.on('invite', (data:any)=>{
			handleInvite(data, socket);
		})

		socket.on('acceptInvite', (data:any)=>{
			navigate(`/game/${data.RoomName}`);
		})
		return () => {
			socket.off('invite');
			socket.off('success');
			socket.off('getData');
			socket.off('getPublic');
			socket.off('createRoom');
			socket.off('ErrorHandle');
			socket.off('isJoin');
			socket.off('receiveMessage');
			socket.off("deleteRoom");
			socket.disconnect();
		};
	}, [])

	const joinRoom = (room: any) => {
		setRoom({ ...room });
		newSocket.emit('join', { ...room, UserName: user });
	}

	console.log(rooms);
	const renderTooltip = (message: string) => (
		<Tooltip id="hover-tooltip">
			{message}
		</Tooltip>
	);


	const toast = useToastInvite();
	const handleInvite = (data:any, socket:Socket) => {
		toast.invite(data, socket);
	}

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
										{rooms.map((chat: Room, index) => (
											<div style={{ width: '100%' }} key={index} onClick={() => joinRoom(chat)}>
												<UserChat chat={chat} user={user} />
											</div>
										))}
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
						<ChatBoxHeader user={user} room={room} socket={newSocket} />
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
