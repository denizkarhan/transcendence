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
    console.log("ChatBox ", message);
    console.log("User ", props.user);

    if (!props.room)
        return (
            <p style={{ textAlign: 'center', width: '100%' }}>No Conversation Selected Yet... </p>
        );
    return (
        <Stack gap={4} className="chat-box">
            <div className="chat-header">
                <strong> AAAAaaaaaaaaaaaaa</strong>
            </div>
            <Stack gap={3} className="messages">
                {message.map((data: any, index: any) => 
                <Stack key={index}>
                    <span>{data.Message}</span>
                    <span>{format(new Date(data.SendAt), 'dd MMM')}</span>
                </Stack>
                )}
            </Stack>
        </Stack>
    );
}

export default ChatBox;