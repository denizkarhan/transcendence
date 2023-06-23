import { Button, Form, Modal } from "react-bootstrap";
import { Socket } from "socket.io-client";

interface Props {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
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
        props.socket.emit('join', { ...formValues, UserName: props.user });
        props.setShow(false);
    }

    return (
        <>
            <Button bsPrefix='btn btn-outline-primary' onClick={() => { props.setShow(true) }}><i className="bi bi-plus-lg"></i></Button>
            <Modal
                show={props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => { props.setShow(false) }}
            >
                <Modal.Header>
                    Join Room
                </Modal.Header>
                <Form
                    onSubmit={onSubmit}>
                    <Modal.Body style={{ justifyContent: 'space-around', display: 'flex', flexWrap: 'wrap' }}>
                        <Form.Label>
                            Room Name
                            <Form.Control required type="text" name="RoomName" placeholder="Room Name" />
                        </Form.Label>
                        <Form.Label>
                            Password
                            <Form.Control type="password" name="Password" placeholder="Password" />
                        </Form.Label>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsPrefix="btn btn-outline-primary" variant="primary" type="submit">
                            Join
                        </Button>
                        <Button bsPrefix="btn btn-outline-primary" onClick={() => { props.setShow(false) }}>Close</Button>
                    </Modal.Footer>
                </Form>
            </Modal >
        </>
    );



}