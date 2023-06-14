import { Stack } from 'react-bootstrap';
import UpdateProfile from './UpdateProfile';
import UpdatePP from './UpdatePP';
import { useState } from 'react';

interface Props {
	pp : string,
	setPP: React.Dispatch<React.SetStateAction<string>>,
}

export default function Settings() {
    const [pp, setPP] = useState('');
    return (
        <Stack direction="horizontal" className='justify-content-center' gap={2}>
            <UpdateProfile />
            <UpdatePP pp={pp} setPP={setPP}/>
        </Stack>
    );
}