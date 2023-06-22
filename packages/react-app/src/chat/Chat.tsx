import { Button, Card, Col, Container, Form, Image, Row, Stack } from "react-bootstrap";
import io, { Socket } from 'socket.io-client';
import { getCookie } from "../api";
import { useEffect, useRef, useState } from "react";
import { Chat } from "../interfaces/chat";
import { useAuthUser } from "react-auth-kit";
import Join from "./join";
import "./chat.css";
import UserChat from "./userChat";
import ChatBox from "./ChatBox";
import CreateChat from "./createChat";

function ChatService() {
<<<<<<< HEAD
	const [show, setShow] = useState(false);
	const URL = "http://k2m13s05.42kocaeli.com.tr:3001/chat";
=======
	const URL = "http://localhost:3001/chat";
>>>>>>> 39b0ad523bd5c2cf4f630c87d7d8efe92af91599
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

		socket.on('isJoin', (data: any) => {
			console.log(data);
		})

		socketRef.current = socket;
		return () => {
			socket.disconnect();
		};
	}, [])

	const createRoom = () => {
		newSocket.emit('createRoom', { roomName: 'deneme1', Admin: user, IsPublic: false, Password: null });
	}
	const sendMessage = () => {
		newSocket.emit('sendMessage', { roomName: 'deneme1', username: user, message: 'first message' });
	}
	const joinRoom = () => {
		newSocket.emit('join', { roomName: 'deneme1', username: user });
	}
	console.log(data);

	return (
<<<<<<< HEAD
		<Container className='custom-container'>
			<Row style={{ height: '80vh' }}>
				<Col md={3} style={{ background: 'white' }}>
					<Row className="border-bottom padding-sm" style={{ color: 'black', height: '3.5rem' }}>
						<Stack direction='horizontal' gap={2} style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
							height: '3rem'
						}}>
							<CreateChat show={show} setShow={setShow} socket={newSocket} user={user}/>
							<Button bsPrefix='btn btn-outline-primary'><i className="bi bi-plus-lg"></i></Button>
						</Stack>
					</Row>
					<ul className="friend-list">
						{data?.map((chat, index) => {
							return (
								<div key={index} onClick={() => setRoom(chat.GroupChat)}>
									<UserChat chat={chat.GroupChat} user={user} />
								</div>
							)
						})}
					</ul>
				</Col>
				<Col style={{ background: 'white' }}>
					<div className="chat-message">
						<ul className="chat">
							<ChatBox room={room} user={user} />
						</ul>
					</div>
					<div className="chat-box bg-white">
						<div className="input-group">
							<input className="form-control border no-shadow no-rounded" placeholder="Type your message here" />
							<span className="input-group-btn">
								<button className="btn btn-success no-rounded" type="button">Send</button>
							</span>
						</div>
					</div>
				</Col>
			</Row>
=======
		// <Container>{data.length < 1 ? null : (
		// 	<Stack direction="horizontal" gap={4} style={{alignItems:'start'}}>
		// 		<Stack className="messages-box flex-grow-0 pe-3" gap={3}>
		// 			{data?.map((chat, index) => {
		// 				return (
		// 					<div key={index} onClick={() => setRoom(chat.GroupChat)}>
		// 						<UserChat chat={chat.GroupChat} user={user} />
		// 					</div>
		// 				)
		// 			})}
		// 		</Stack>
		// 		<ChatBox room={room} user={user}/>
		// 	</Stack>
		// )}
		// </Container>
		<Container fluid style={{ height: '90vh' }}>
			{/* <Row style={{ height: '100%' }}>
				<Col md={3}> */}
			<Stack direction="horizontal" gap={4} style={{ alignItems: 'start' }}>
				<Stack bsPrefix="messages-box pe-3" gap={3} style={{ flexGrow: '0' }}>
					{data?.map((chat, index) => {
						return (
							<div key={index} onClick={() => setRoom(chat.GroupChat)}>
								<UserChat chat={chat.GroupChat} user={user} />
							</div>
						)
					})}
				</Stack>
				<ChatBox room={room} user={user} />
			</Stack>
			{/* </Col>
				<Col md={9}> */}
			{/* </Col>
			</Row> */}
>>>>>>> 39b0ad523bd5c2cf4f630c87d7d8efe92af91599
		</Container>
	);
}

export default ChatService;