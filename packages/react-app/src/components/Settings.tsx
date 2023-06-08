import { Container } from 'react-bootstrap';
import api from '../api';
// import UpdateProfile from './UpdateProfile';
// import UpdatePP from './UpdatePP';

interface Props {
	pp : string,
	setPP: React.Dispatch<React.SetStateAction<string>>,
}

export default function Settings(prop : Props) {
    const onSubmit = async (event: any) => {
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        console.log(formData);
        await api.post("upload-avatar", formData)
            .then()
            .catch();
    }
    return (
        <Container>
            {/* <UpdateProfile />
            <UpdatePP pp={prop.pp} setPP={prop.setPP}/> */}
        </Container>
    );
}