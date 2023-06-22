import { Col, Image, Row, Stack } from "react-bootstrap";
import { message } from "antd";
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import "./chat.css";

interface Props {
	room: any;
	user: any;
}

const ChatBox = (props: Props) => {
	const [message, setMessage] = useState<any[]>([]);

	useEffect(() => {
		if (props.room)
			setMessage(props.room.Messages);
	}, [props.room])
	console.log(message);
	if(props.room)
		console.log("ChatBox ", message[0]?.User.users.Login);
	console.log("User ", props.user);

	if (!props.room)
		return (
			<p style={{ textAlign: 'center', width: '100%' }}>No Conversation Selected Yet... </p>
		);

	return (
		<div>
			{message.map((data: any, index: number) => (
				<>
					<li key={index} className={data?.User.users.Login === props.user ? "right clearfix" :"left clearfix"}>
						<span className={data?.User.users.Login === props.user ? "chat-img pull-right" :"chat-img pull-left"}>
							<Image src="https://bootdey.com/img/Content/user_3.jpg" alt="User Avatar" />
						</span>
						<div className="chat-body clearfix">
							<div className="header">
								<strong className="primary-font">{data?.User.users.Login}</strong>
								<small className="pull-right text-muted"><i className="fa fa-clock-o"></i> {format(new Date(data.SendAt), 'dd MMM')}</small>
							</div>
							<p style={{color:'black'}}>
								{data.Message}
							</p>
						</div>
					</li>
				</>
			))}
		</div>
	);
}

export default ChatBox;