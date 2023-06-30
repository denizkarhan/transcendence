import { Button, Modal } from "react-bootstrap";
import { ChatUser } from "../../interfaces/chatUser";

interface Props {
    users: ChatUser[];
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    show: boolean;
}



const ChatSettings = (props: Props) => {

    const handleKeyDown = (event: any) => {
        if (event.key === 'Escape') {
            props.setShowModal(false);
        }
    };

    return (
        <Modal show={props.show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered  onEscapeKeyDown={handleKeyDown}>
            <Modal.Header closeButton onClick={() => props.setShowModal(false)}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>
        </Modal>
    );
}

export default ChatSettings;