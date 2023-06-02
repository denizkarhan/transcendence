import {Container} from 'react-bootstrap';
import api from "../api";
import { getCookie } from "../api";

export default function Home() {
    return (
    <Container>
        <h1>This is the homepage!</h1>
    </Container>
    );
}