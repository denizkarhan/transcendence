import { useEffect, useState } from "react";
import { Room } from "../interfaces/room";
import { Button, Card, Dropdown, DropdownButton, Offcanvas, Stack } from "react-bootstrap";
import "./chat.css";
import ChatSettings from "./chatUtils/chatSettings";
import { ChatUser } from "../interfaces/chatUser";
import { Socket } from "socket.io-client";


interface Props {
	room: Room | null;
	user: any;
	socket: Socket;
}

const ChatBoxHeader = (props: Props) => {
	const [settingsModalShow, setSettingsModalShow] = useState(false);
	const [chatName, setChatName] = useState<string | undefined>('');
	useEffect(() => {
		if (props.room?.RoomName[0] !== '#') {
			const userName = props.room?.Users.filter(user => user.users.Login !== props.user)[0].users.Login;
			setChatName(userName);
		}
		else
			setChatName(props.room?.RoomName);

	}, [props])
	if (!props.room)
		return null;
	
	return (
		<>
			<Card.Header style={{ borderBottom: '1px solid', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
				{chatName}
				<Button bsPrefix="btn btn-outline-primary" onClick={() => setSettingsModalShow(true)}>
					<i className="bi bi-three-dots-vertical"></i>
				</Button>
			</Card.Header>
			<ChatSettings show={settingsModalShow} setShowModal={setSettingsModalShow} users={props.room.Users} socket={props.socket} user={props.user} RoomName={props.room.RoomName} />
		</>
	);
}

export default ChatBoxHeader;