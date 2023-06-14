import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import io, { Socket } from 'socket.io-client';
import { getCookie } from '../api';

const ChatComponent = () => {

	let socket: Socket;

	const connect = () => {
		const URL = "http://localhost:3001";
		socket = io(URL, {
			auth: {
				nick: getCookie("42_auth_state"),
				token: getCookie("42_auth")
			},
			autoConnect: false
		});
		socket.connect();
	}

	const joinROOM = async () => {
		socket.on("MSG", (data: string) => console.log(data));
		socket.emit('join', { name: "test room" } , (data:string) => console.log(data));
	}

	const toROOM = () => {
		socket.emit('toROOM', { name: "test room", msg: "sexingen" } , (data:string) => console.log(data));
	}

	const leaveROOM = () => {
		socket.emit('leave', { name: "test room" } , (data:string) => console.log(data));
	}

	return (
		<div>
			<Button onClick={connect}>Connect</Button>
			<Button onClick={joinROOM}>joinROOM</Button>
			<Button onClick={leaveROOM}>leaveROOM</Button>
			<Button onClick={toROOM}>sendMSG</Button>
		</div>
	);
};

export default ChatComponent;