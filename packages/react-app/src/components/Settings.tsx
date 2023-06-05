import { Container } from 'react-bootstrap';
import api from '../api';

export default function Settings() {
    const onSubmit = async (event : any) => {
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        console.log(formData);
        await api.post("upload-avatar", formData)
            .then()
            .catch();
    }
    return (
        <Container>
            <form>
                <label htmlFor="photo">Upload an image: </label>
                <input name="photo" type="file" accept='image/*' onInput={onSubmit}></input>
            </form>
        </Container>
    );
}