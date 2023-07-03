import { useEffect, useRef, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { Socket } from "socket.io-client";

interface Props {
	socket: Socket;
	user: string;
}

export default function CreateChat(props: Props) {
	const [isPasswordEntered, setIsPasswordEntered] = useState(false);
	const onSubmit = async (event: any) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const formValues = Object.fromEntries(formData.entries());
		Object.keys(formValues).forEach((key) => {
			if (formValues[key] === '') {
				delete formValues[key];
			}
		});
		const IsPublic = formValues.hasOwnProperty('IsPublic') && formValues['IsPublic'].toString() === 'on';
		if (formValues["RoomName"].toString().at(0) !== '#')
			formValues["RoomName"] = "#" + formValues["RoomName"];
		props.socket.emit('createRoom', { ...formValues, IsPublic: IsPublic, Admin: props.user });
	}

	const handlePasswordChange = (event: any) => {
		const enteredPassword = event.target.value;

		if (enteredPassword) {
			setIsPasswordEntered(true);
		} else {
			setIsPasswordEntered(false);
		}
	};

	return (
		<Form onSubmit={onSubmit}>
			<Form.Group controlId="RoomName">
				<Form.Label>Room Name</Form.Label>
				<Form.Control key='CreateRoom' required type="text" name="RoomName" placeholder="Room Name" />
			</Form.Group>

			<Form.Group controlId="Password">
				<Form.Label>Password</Form.Label>
				<Form.Control key='CreatePass' type="password" name="Password" placeholder="Password" onChange={handlePasswordChange}/>
			</Form.Group>
			<Form.Group controlId="IsPublic">
				<Form.Check
					type="switch"
					id="custom-switch"
					label="Public"
					name="IsPublic"
					disabled={isPasswordEntered}
				/>
			</Form.Group>

			<Button bsPrefix="btn btn-outline-primary" variant="primary" type="submit">
				Create
			</Button>
		</Form>
	);

}

{/* <i className="bi bi-chat-left"></i>
<i className="bi bi-plus-square"></i>
<i className="bi bi-door-open"></i>
<i className="bi bi-incognito"></i>
<i className="bi bi-p-square"></i> */}