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

	if (!props.room)
		return (
			<p style={{ textAlign: 'center', width: '100%', color: 'black' }}>No Conversation Selected Yet... </p>
		);

	return (
		<>
			{message.map((data: any, index: number) => (
				<div key={index}>
					<li className={data?.User.users.Login === props.user ? "right clearfix" : "left clearfix"}>
						<div className="chat-body clearfix">
							<div className="header">
								<strong className="primary-font">{data?.User.users.Login}</strong>
								<small className="pull-right text-muted"><i className="fa fa-clock-o"></i> {format(new Date(data.SendAt), 'dd MMM')}</small>
							</div>
							<p style={{ color: 'black' }}>
								{data.Message}
							</p>
						</div>
					</li>
				</div>
			))}
		</>
	);
}

export default ChatBox;