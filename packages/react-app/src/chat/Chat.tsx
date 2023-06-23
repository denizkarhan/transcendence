import { Button, Card, Col, Container, Form, Image, Row, Stack } from "react-bootstrap";
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

function ChatService() {
	const { showError, showSuccess } = useToast();
	const [showCreate, setShowCreate] = useState(false);
	const [showJoin, setShowJoin] = useState(false);
	const [deneme, setDeneme] = useState<string[]>([])
	const URL = "http://k2m13s05.42kocaeli.com.tr:3001/chat";
	const auth = useAuthUser();
	const socketRef = useRef<any>(null);
	const newSocket = socketRef.current as Socket;

	const user = auth()?.username ?? "User";
	const [data, setData] = useState<any[]>([]);
	const [room, setRoom] = useState<any>(null);
	useEffect(() => {
		const socket = io(URL, {
			auth: {
				nick: getCookie("42_auth_state"),
				token: getCookie("42_auth")
			},
		});

		socket.emit('getData', { userName: user });

		socket.on('getData', (data: any) => {
			setData(data);
		});

		socket.on('createRoom', (data: any) => {
			setData(prevData => [...prevData, data]);
		});

		socket.on('ErrorHandle', (data: any) => {
			showError(data.message);
		})

		socket.on('isJoin', (data: any) => {
			console.log(data);
		})

		socket.on('receiveMessage', (data: any) => {
			console.log('Alınan mesaj:', data);
		});

		socketRef.current = socket;
		return () => {
			socket.disconnect();
		};
	}, [])

	// const createRoom = () => {
	// 	newSocket.emit('createRoom', { roomName: 'deneme1', Admin: user, IsPublic: false, Password: null });
	// }
	const sendMessage = () => {
		newSocket.emit('sendMessage', { roomName: 'deneme1', username: user, message: 'first message' });
	}
	const joinRoom = () => {
		newSocket.emit('join', { roomName: 'deneme1', username: user });
	}
	console.log(data);

	return (
		<Container className='custom-container'>
			<Row style={{ height: '80vh' }}>
				<Col md={4} style={{ background: 'white' }}>
					<Row className="border-bottom padding-sm" style={{ color: 'black', height: '3.5rem' }}>
						<Stack direction='horizontal' gap={2} style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
							height: '3rem'
						}}>
							<CreateChat key='CreateChat' show={showCreate} setShow={setShowCreate} socket={newSocket} user={user} />
							<JoinRoom key='JoinRoom' show={showJoin} setShow={setShowJoin} socket={newSocket} user={user} />
						</Stack>
					</Row>
					<ul className="friend-list">
						{data?.map((chat, index) => {
							return (
								<div key={index} onClick={() => setRoom(chat)}>
									<UserChat chat={chat} user={user} />
								</div>
							)
						})}
					</ul>
				</Col>
				<Col md={8} style={{ background: 'white', display: 'flex', flexDirection: 'column' }}>
					<div className="chat-message" style={{ flex: '1 1 auto' }}>
						<ul className="chat">
							<ChatBox key='ChatBox' room={room} user={user} />
						</ul>
					</div>
					<SendMessage key='sendMessage' room={room} socket={newSocket} user={user} deneme={deneme} />
				</Col>
			</Row>
		</Container>
	);
}

export default ChatService;