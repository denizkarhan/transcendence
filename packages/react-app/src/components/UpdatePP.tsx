import { Card, Container, FloatingLabel, Form, Modal, Button, Image } from 'react-bootstrap';
import api from '../api';
import './Settings.css';
import '../App.css';
import { getPP } from './Main';
import { useState } from 'react';

interface Props {
    pp: string,
    setPP: React.Dispatch<React.SetStateAction<string>>,
}

export default function UpdatePP(prop: Props) {
    const onFinish = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        const fileInput = event.currentTarget.elements.namedItem('file') as HTMLInputElement;

        if (fileInput?.files && fileInput.files.length > 0) {
            formData.append('file', fileInput.files[0]);

            await api.post("upload-avatar", formData)
                .then()
                .catch();

            const pp = await getPP();
            prop.setPP(pp);
        }
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container>
                <Button variant="primary" onClick={handleShow}>Change Profile Pic</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change your profile picture.</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={onFinish}>
                        <Form.Group controlId="formFile">
                            <Modal.Body>
                                <Image src={prop.pp} className="profile-image" thumbnail />
                                <Form.Label>
                                    Upload an image:
                                    <Form.Control type="file" name="file" accept="image/jpeg" lang="en" />
                                </Form.Label>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" type="submit">
                                    Update
                                </Button>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Form.Group>
                    </Form>
                </Modal>
        </Container>
    );
}
