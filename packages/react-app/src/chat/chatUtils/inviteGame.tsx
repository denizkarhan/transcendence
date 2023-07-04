import React, { createContext, useContext, useRef, useState } from 'react'
import { Toast, Button, Stack } from 'react-bootstrap'
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';

interface ToastProviderProps {
	children: React.ReactNode;
}

interface ToastContextType {
	invite: (data: any, socket: Socket) => void;
}

export const ToastContext = createContext<ToastContextType>({
	invite: () => { }
});

export const InviteToast: React.FC<ToastProviderProps> = ({ children }) => {
	const navigate = useNavigate();
	const [showToast, setToast] = useState(false);
	const [accept, setAccept] = useState<boolean>(false);
	const [inviteUser, setInviteUser] = useState<{ Invited: string, RoomName: string, UserName: string }>();
	const socketRef = useRef<any>(null);
	const newSocket = socketRef.current as Socket;

	const invite = (data: any, socket: Socket) => {
		console.log('Invite:', data);
		setInviteUser(data);
		socketRef.current = socket;
		setToast(true);

		setTimeout(() => {
			setToast(false);
		}, 3000);
	};
	// /9912349a-1c85-44ae-a79a-7337ab3a946d
	// /9912349a-1c85-44ae-a79a-7337ab3a946d
	const handleAccept = () => {
		if (showToast)
			setToast(false);
		newSocket.emit('acceptInvite', { ...inviteUser });
		navigate(`game/${inviteUser?.RoomName}`);
		return;
	}

	return (
		<ToastContext.Provider value={{ invite }}>
			{children}
			<div id="invite-container">
				<ToastContainer
					className="p-3"
					position="middle-end"
					style={{ zIndex: 1, }}
				>
					<Toast show={showToast} style={{background:'black', borderRadius: '1rem', border: '2px solid', borderColor:'#54B4D3'}}>
						<Toast.Header closeButton={false} style={{background:'black', color:'white'}}>
							<strong className="me-auto">Game Invite</strong>
						</Toast.Header>
						<Toast.Body style={{background:'black'}}>{inviteUser?.UserName} invites you to the game</Toast.Body>
						<Stack gap={2} direction='horizontal' style={{display:'flex', justifyContent:'center'}}>
							<Button onClick={handleAccept} bsPrefix='btn btn-outline-success' >Accept</Button>
							<Button onClick={() => setToast(false)} bsPrefix='btn btn-outline-danger' >Decline</Button>
						</Stack>
					</Toast>
				</ToastContainer>
			</div>
		</ToastContext.Provider>
	)
}

export const useToastInvite = () => {
	return useContext(ToastContext);
};