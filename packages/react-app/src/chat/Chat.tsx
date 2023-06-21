import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import io, { Socket } from 'socket.io-client';
import "./chat.css"
import { getCookie } from "../api";
import { useEffect, useState } from "react";
import { Chat } from "../interfaces/chat";
import { useAuthUser } from "react-auth-kit";

export default function ChatService() {
	const URL = "http://k2m13s05.42kocaeli.com.tr:3001/chat";
	let socket: Socket;
	const auth = useAuthUser();

	const user = auth()?.username ?? "User";
	const [data, setData] = useState<any[]>([]);
	useEffect(() => {
		socket = io(URL, {
			auth: {
				nick: getCookie("42_auth_state"),
				token: getCookie("42_auth")
			},
		});
		if (socket.connect())
			socket.emit('getData', {userName:user});
		if (socket.connect())
		{
			socket.on('getData', (data:any)=>{
				setData(data);
			});
		}
		return () => {
			socket.disconnect();
		};
	}, [])
	const createRoom = () => {
		if (socket.connect())
			socket.emit('createRoom', { roomName: 'deneme1', Admin: user, IsPublic: false, Password: null });
	}

	const sendMessage = () => {
		if (socket.connect())
			socket.emit('sendMessage', {roomName:'deneme1', username:user, message:'first message'});
	}

	const joinRoom = () => {
		
	}
	console.log(data);
	return (
		<Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
			<Row className="clearfix">
				<Col lg={12}>
					<Card className="chat-app">
						<Button onClick={createRoom}>CreateRoom</Button>
						<Button onClick={sendMessage}>SendMessage</Button>
						<div id="plist" className="people-list">
							<ul className="list-unstyled chat-list mt-2 mb-0">
								{/* {data.map((chat, index) => (
									<li key={index} className="clearfix">
										<div className="about">
											<div className="name">{chat.user.FirstName} {chat.user.LastName}</div>
											<div className="status"> <i className="bi bi-dot" style={{ color: (chat.user.Status === 'online' ? '#00FF00' : '#808080') }}></i> left 7 mins ago </div>
										</div>
									</li>
								))} */}
							</ul>
						</div>
						<div className="chat">
							<div className="chat-header clearfix">
								<div className="row">
									<div className="col-lg-6">
										<a data-toggle="modal" data-target="#view_info">
											<Image src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
										</a>
										<div className="chat-about">
											<h6 className="m-b-0">Aiden Chavez</h6>
											<small>Last seen: 2 hours ago</small>
										</div>
									</div>
								</div>
							</div>
							<div className="chat-history">
								<ul className="m-b-0">
									<li className="clearfix">
										<div className="message-data text-right">
											<span className="message-data-time">10:10 AM, Today</span>
											{/* <Image src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" /> */}
										</div>
										<div className="message other-message float-right"> Hi Aiden, how are you? How is the project coming along? </div>
									</li>
									<li className="clearfix">
										<div className="message-data">
											<span className="message-data-time">10:12 AM, Today</span>
										</div>
										<div className="message my-message">Are we meeting today?</div>
									</li>
									<li className="clearfix">
										<div className="message-data">
											<span className="message-data-time">10:15 AM, Today</span>
										</div>
										<div className="message my-message">Project has been already finished and I have results to show you.</div>
									</li>
								</ul>
							</div>
							<div className="chat-message clearfix">
								<div className="input-group mb-0">
									<div className="input-group-prepend">
										<span className="input-group-text"><i className="bi bi-send"></i></span>
									</div>
									<input type="text" className="form-control" placeholder="Enter text here..." />
								</div>
							</div>
						</div>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}