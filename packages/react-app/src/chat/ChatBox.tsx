import { Card, Col, Image, Row, Stack } from "react-bootstrap";
import { useCallback, useEffect, useRef, useState } from "react";
import { format } from 'date-fns';
import { getPP } from "../components/Main";
import { Room } from "../interfaces/room";
import { Chat } from "../interfaces/chat";
import { Message } from "../interfaces/message";
import "./chat.css";

interface Props {
	room: any;
	user: any;
}

const ChatBox = (props: Props) => {
	const [message, setMessage] = useState<Message[]>([]);
	useEffect(() => {
		if (props.room)
			setMessage(props.room.Messages);
		const element = document.querySelector(".custom-card-body");
		element!.scrollTop = element!.scrollHeight;
	}, [props])
	if (!props.room)
		return (
			<p style={{ textAlign: 'center', width: '100%' }}>No Conversation Selected Yet... </p>
		);


	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			{message?.map((data: any, index: number) => (
				<div
					key={index}
					style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', justifyContent: data.User.users.Login === props.user ? 'flex-end' : 'flex-start' }}
				>
					{/* Kullanıcıya bağlı olarak hizalama yapmak için gerekli düzenlemeleri burada yapabilirsiniz */}
					{/* <Image src={...} alt="avatar" className="rounded-circle d-flex align-self-start me-3 shadow-1-strong" /> */}
					<Card className="mask-custom" style={{ maxWidth: '50%' }}>
						<Card.Header
							className="d-flex justify-content-between p-3"
							style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
						>
							<p className="fw-bold mb-0">{data.User.users.Login}</p>
							<p className="text-light small mb-0">
								{format(new Date(data.SendAt), 'dd MMM')}
							</p>
						</Card.Header>
						<Card.Body>
							<p className="mb-0">
								{data.Message}
							</p>
						</Card.Body>
					</Card>
					{/* Kullanıcıya bağlı olarak hizalama yapmak için gerekli düzenlemeleri burada yapabilirsiniz */}
					{/* <Image src={...} alt="avatar" className="rounded-circle d-flex align-self-start me-3 shadow-1-strong" /> */}
				</div>
			))}
		</div>
	);
}

export default ChatBox;