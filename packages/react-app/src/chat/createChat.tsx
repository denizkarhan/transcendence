import { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Socket } from "socket.io-client";

interface Room {
	RoomName: string;
	Admin: string;
	IsPublic: boolean;
	Password: string;
}

interface Props {
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	socket: Socket;
	user:string;
}

export default function CreateChat(props: Props) {
	let room : Room;
	const onSubmit = async (event: any) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const formValues = Object.fromEntries(formData.entries());
		Object.keys(formValues).forEach((key) => {
			if (formValues[key] === '') {
				delete formValues[key];
			}
		});
		if (formValues?.IsPublic === 'on')
			room.IsPublic = true;
		else
			room.IsPublic = false;
		room.Admin = props.user;
		room.Password = formValues.Password.toString();
		room.RoomName = formValues.RoomName.toString();
		console.log(room);
	}
	return (
		<>
			<Button bsPrefix='btn btn-outline-danger' onClick={() => { props.setShow(true) }} ><i className="bi bi-chat-left"></i></Button>
			<Modal
				show={props.show}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					New Chat
				</Modal.Header>
				<Form
					onSubmit={onSubmit}>
					<Modal.Body style={{ justifyContent: 'space-around', display: 'flex', flexWrap: 'wrap' }}>
						<Form.Label>
							Room Name:
							<Form.Control type="text" name="RoomName" placeholder="First Name" />
						</Form.Label>
						<Form.Label>
							Password
							<Form.Control type="password" name="Password" placeholder="Username" />
						</Form.Label>
						<Form.Label>
							<Form.Check // prettier-ignore
								type="switch"
								id="custom-switch"
								label="Public"
								name="IsPublic"
							/>
						</Form.Label>
					</Modal.Body>
					<Modal.Footer>
						<Button bsPrefix="btn btn-outline-primary" variant="primary" type="submit">
							Create
						</Button>
						<Button bsPrefix="btn btn-outline-primary" onClick={() => { props.setShow(false) }}>Close</Button>
					</Modal.Footer>
				</Form>
			</Modal >
		</>
	);

}