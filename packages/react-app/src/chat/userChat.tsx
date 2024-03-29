import { format } from 'date-fns';
import "./chat.css";
import { useEffect, useState } from 'react';
import { Room } from '../interfaces/room';
import { Button } from 'react-bootstrap';

interface Props {
	chat: Room | null;
	user: any;
}

const UserChat = (props: Props) => {
	// console.log(props.chat);
	const [chatName, setChatName] = useState<string | undefined>('');

	useEffect(() => {
		if (props.chat?.RoomName[0] !== '#') {
			const userName = props.chat?.Users.filter(user => user.users.Login !== props.user);
			if (userName?.length)
				setChatName(userName[0].users.Login);
		}
		else
			setChatName(props.chat?.RoomName);

	}, [props])
	return (
		<li
			className="p-2 border-bottom"
			style={{
				borderBottom: "1px solid",
				listStyleType: 'none'
			}}
		>
			<a
				style={{cursor:"pointer"}}
				className="d-flex justify-content-between link-light"
			>
				<div className="d-flex flex-row">
					<div className="pt-1">
						<p className="fw-bold mb-0">{chatName}</p>
						<p className="small text-white">
							{props.chat?.Messages[props.chat.Messages.length - 1].Message}
						</p>
					</div>
				</div>
				<div className="pt-1">
					<p className="small mb-1 text-white">{format(new Date(props.chat!.Messages[props.chat!.Messages.length - 1].SendAt), 'dd MMM')}</p>
				</div>
			</a>
		</li>
	);
}

export default UserChat;