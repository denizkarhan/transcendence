import { Image, Stack } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import Avatar from "../assets/Avatar.svg";
import "./chat.css";

interface Props {
	chat: any;
	user: any;
}

const UserChat = (props: Props) => {
	console.log(props.chat.Messages);
	return (
		<li className="active bounceInDown">
			<a href="#" className="clearfix">
				<Image src="https://bootdey.com/img/Content/user_1.jpg" alt="" className="img-circle" />
				<div className="friend-name">
					<strong>{props.chat.RoomName}</strong>
				</div>
				<div className="last-message text-muted">{props.chat.Messages[props.chat.Messages.length - 1].Message}</div>
				<small className="time text-muted">Just now</small>
				<small className="chat-alert label label-danger">1</small>
			</a>
		</li>
	);
}

export default UserChat;