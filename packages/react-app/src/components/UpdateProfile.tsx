import { Card, Container, FloatingLabel, Form, Modal, Button, Image } from 'react-bootstrap';
import api from '../api';
import { useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
// import {Formik, Field} from 'formik';

export default function UpdateProfile() {


    const onSubmit = async (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formValues = Object.fromEntries(formData.entries());
        Object.keys(formValues).forEach((key) => {
            if (formValues[key] === '') {
                delete formValues[key];
            }
        });
        await api.post('users/update', formValues)
            .then((response) => {
                handleClose();
            })
            .catch((error) => console.log(error));
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container>
            <Button variant="primary" onClick={handleShow}>Update Profile</Button>
            <Modal
                show={show}
                onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change your info</Modal.Title>
                </Modal.Header>
                <Form
                    onSubmit={onSubmit}>
                    <Modal.Body>
                        <Form.Label>
                            New First Name:
                            <Form.Control type="text" name="FirstName" placeholder="First Name" />
                        </Form.Label>
                        <Form.Label>
                            New Last Name:
                            <Form.Control type="text" name="LastName" placeholder="Last Name" />
                        </Form.Label>
                        <Form.Label>
                            New Username:
                            <Form.Control type="text" name="Login" placeholder="Username" />
                        </Form.Label>
                        <Form.Label>
                            New Email:
                            <Form.Control type="text" name="Email" placeholder="Email" />
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
                </Form>
            </Modal>
        </Container>
    );
}