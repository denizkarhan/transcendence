import { Button, Form, Modal } from "react-bootstrap";
import { Socket } from "socket.io-client";

interface Props {
	socket: Socket;
	user: string;
}

export default function JoinRoom(props: Props) {

	const onSubmit = async (event: any) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const formValues = Object.fromEntries(formData.entries());
		Object.keys(formValues).forEach((key) => {
			if (formValues[key] === '') {
				delete formValues[key];
			}
		});
		if (formValues["RoomName"].toString().at(0) !== '#')
			formValues["RoomName"] = "#" + formValues["RoomName"];
		props.socket.emit('join', { ...formValues, UserName: props.user });
	}

	return (

		<Form onSubmit={onSubmit}>
			<Form.Group controlId="roomName">
				<Form.Label>Room Name</Form.Label>
				<Form.Control key='JoinRoom' required type="text" name="RoomName" placeholder="Room Name" />
			</Form.Group>

			<Form.Group controlId="passwordJoin">
				<Form.Label>Password</Form.Label>
				<Form.Control key='JoinPass' type="password" name="Password" placeholder="Password" />
			</Form.Group>

			<Button bsPrefix="btn btn-outline-primary" variant="primary" type="submit">
				Join
			</Button>
		</Form>
	);



}