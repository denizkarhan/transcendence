import { Socket } from "socket.io-client";
import "./chat.css";
import { Button, Offcanvas } from "react-bootstrap";
import { useState } from "react";

interface Prop {
    socket: Socket;
}

export default function Join(prop: Prop) {
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const toggleOffcanvas = () => {
        setShowOffcanvas(!showOffcanvas);
    };
    return (
        <div className="input-group">
            {/* <div className="input-group-prepend">
                <span className="input-group-text"><i className="bi bi-search"></i></span>
            </div>
            <input type="text" className="form-control" placeholder="Search..."/> */}
            <div className="offcanvas-container">
                <Button variant="primary" onClick={toggleOffcanvas}>
                    Join
                </Button>
                <Offcanvas show={showOffcanvas} onHide={toggleOffcanvas} placement="start">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Offcanvas Title</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {/* Offcanvas içeriği buraya gelecek */}
                        Offcanvas Content
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </div>
    );
}