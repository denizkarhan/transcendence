import { Stack } from 'react-bootstrap';
import UpdateProfile from './UpdateProfile';
import UpdatePP from './UpdatePP';

interface Props {
	pp : string,
	setPP: React.Dispatch<React.SetStateAction<string>>,
}

export default function Settings(prop : Props) {
    return (
        <Stack direction="horizontal" className='justify-content-center' gap={2}>
            <UpdateProfile />
            {/* <UpdatePP pp={prop.pp} setPP={prop.setPP}/> */}
        </Stack>
    );
}