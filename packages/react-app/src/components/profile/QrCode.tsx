import api from '../../api';
import { Modal, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

interface Props {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function QrCode(props: Props) {
    const [qr, setQr] = useState<string>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get('/authanticator/enable2fa', { responseType: 'blob' });
            const imageBlob = new Blob([response.data], { type: 'image/png' });
            const imgURL = URL.createObjectURL(imageBlob);
            setQr(imgURL);
        }
        fetchData();
    }, []);
    return (
        <Modal show={props.show}>
            <Modal.Header>
                Close the popup after scanning the QR Code
            </Modal.Header>
            <img src={qr}></img>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => { props.setShow(false) }}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}