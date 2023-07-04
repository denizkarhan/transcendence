import React, { createContext, useContext, useState } from 'react'
import { Toast, Button } from 'react-bootstrap'
import ToastContainer from 'react-bootstrap/ToastContainer';
import "./invite.css";

interface ToastProviderProps {
	children: React.ReactNode;
}

interface ToastContextType {
	invite: (data: any) => void;
}

export const ToastContext = createContext<ToastContextType>({
	invite: () => { }
});

export const InviteToast: React.FC<ToastProviderProps> = ({ children }) => {
	const [showToast, setToast] = useState(false);

	const invite = (data: any) => {
		// Davet işlemini gerçekleştir
		console.log('Invite:', data);
		setToast(true);
		const successToast = document.createElement('div');
		successToast.classList.add('my-success-toast');
		successToast.innerText = "successMessage";

		document.body.appendChild(successToast);

		setTimeout(() => {
			document.body.removeChild(successToast);
		}, 3000);
	};

	return (
		<ToastContext.Provider value={{ invite }}>
			{children}
			{/* <div
				aria-live="polite"
				aria-atomic="true"
				className="bg-dark position-relative"
				style={{ minHeight: '240px' }}
			>
				<ToastContainer
					className="p-3"
					position='top-end'
					style={{ zIndex: 1 }}

				>
					<Toast
						onClose={() => setToast(false)}
						autohide
						show={showToast}
						delay={2200}
					>
						<Toast.Header>
							<strong className="mr-auto">React Toast</strong>
							<small>50 mins ago</small>
						</Toast.Header>
						<Toast.Body>Lorem ipsum dolor sit adipiscing elit.</Toast.Body>
					</Toast>
				</ToastContainer>
			</div> */}
		</ToastContext.Provider>
	)
}

export const useToastInvite = () => {
	return useContext(ToastContext);
};