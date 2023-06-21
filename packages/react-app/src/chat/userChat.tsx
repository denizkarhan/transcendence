import { Image, Stack } from "react-bootstrap";
import Avatar from "../assets/Avatar.svg";
import "./chat.css";
interface Props {
    chat: any;
    user: any;
}

const UserChat = (props: Props) => {
    return (
        <Stack
        direction="horizontal"
        gap={3}
        className="user-card p-2"
        style={{ alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}
        role="button"
        >
            <div className="d-flex">
                <div className="me-2">
                    <Image src={Avatar} height='35px' />
                </div>
                <div className="text-content">
                    <div className="name">{props.chat.RoomName}</div>
                    <div className="text">Text</div>
                </div>
            </div>
            <div className="d-flex flex-column align-items-end">
                <div className="date">12.12.2023</div>
                <div className="this-user-notifications">2</div>
                <span className="user-online"></span>
            </div>
        </Stack>
    );
}

export default UserChat;