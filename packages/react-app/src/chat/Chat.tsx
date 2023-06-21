import { Button, Card, Col, Container, Image, Row, Stack } from "react-bootstrap";
import io, { Socket } from 'socket.io-client';
import { getCookie } from "../api";
import { useEffect, useRef, useState } from "react";
import { Chat } from "../interfaces/chat";
import { useAuthUser } from "react-auth-kit";
import Join from "./join";
import "./chat.css";
import UserChat from "./userChat";
import ChatBox from "./ChatBox";

function ChatService() {
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
				<ChatBox room={room} user={user}/>
			</Stack>
			{/* </Col>
				<Col md={9}> */}
			{/* </Col>
			</Row> */}
		</Container>

	);
}

export default ChatService;
