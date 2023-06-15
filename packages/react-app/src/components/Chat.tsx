import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import io, { Socket } from 'socket.io-client';
import { getCookie } from '../api';

export interface room{
	roomName?:string,
	isPublic:Boolean,
	password?:string
}

const ChatComponent = () => {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [room, setRoom] = useState<room>();
	let socket: Socket;
	useEffect(() =>{
		setRoom({
			roomName: 'merhaba',
			isPublic: false,
			password: '2'
		})
	},[])
	const connect = () => {
		const URL = "http://localhost:3001";
		socket = io(URL, {
			auth: {
				nick: getCookie("42_auth_state"),
				token: getCookie("42_auth")
			},
			autoConnect: false
		});
		if (socket.connect()) {
			socket.on("MSG", (data: string) => console.log(data));
			console.log("Connection Success");
		}
		else
			console.log("Connection Fail");
	}

	const createROOM = () => {
		socket.emit('create', room, (data:string) => console.log(data));
	}

	const joinROOM = async () => {
		socket.emit('join', { name: "merhaba", pass: "1" } , (data:string) => console.log(data));
	}

	const toROOM = () => {
		socket.emit('toROOM', { name: "test room", msg: "sexingen" } , (data:string) => console.log(data));
	}

	const leaveROOM = () => {
		socket.emit('leave', { name: "merhaba" } , (data:string) => console.log(data));
	}
	
	const changePASS = () => {
		socket.emit('changePass', { channel: "merhaba", newpass: "3"});
	}

	return (
		<div>
			<input
        		ref={inputRef}
        		type="text"
        		id="message"
        		name="message"
        		autoComplete="off"
      		/>
			<Button onClick={connect}>Connect</Button>
			<Button onClick={createROOM}>CreateROOM</Button>
			<Button onClick={joinROOM}>JoinROOM</Button>
			<Button onClick={changePASS}>ChangePASS</Button>
			<Button onClick={leaveROOM}>LeaveROOM</Button>
			<Button onClick={toROOM}>SendMSG</Button>
		</div>
	);
};

export default ChatComponent;