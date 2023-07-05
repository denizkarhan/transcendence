import { useState } from "react";
import { Socket } from "socket.io-client";
import { Room } from "../interfaces/room";


interface Props {
    socket: Socket;
    room: any;
    user: string;
}
let i = 0;
export default function SendMessage(props: Props) {
    const [message, setMessage] = useState('');

    const handleInputChange = (event: any) => {
        setMessage(event.target.value);
    };

    const sendMessage = () => {
        // console.log("aaaaaaaaaaaaa");
        props.socket.emit('sendMessage', { RoomName: props.room.RoomName, UserName: props.user, Message: message });
        setMessage('');
    }
    const handleKeyDown = (event:any) => {
        if (event.key === 'Enter' && message) {
            sendMessage();
        }
    };
	if (!props.room)
		return (null);
    return (
        <div className="chat-box bg-white" style={{ flex: '0 0 auto' }}>
            <div className="input-group">
                <input
                    className="form-control border no-shadow no-rounded"
                    placeholder="Type your message here"
                    value={message}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <span className="input-group-btn">
                    <button className="btn btn-success no-rounded" type="button" onClick={sendMessage}>
                        Send
                    </button>
                </span>
            </div>
        </div>
    );
}