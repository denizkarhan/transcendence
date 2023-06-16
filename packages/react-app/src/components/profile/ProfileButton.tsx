import { useAuthUser } from "react-auth-kit";
import { Button, Stack } from "react-bootstrap";
import UpdateProfile from "../UpdateProfile";
import api from "../../api";
import { useToast } from "../Toast";
import { useEffect, useState } from "react";
import { error } from "console";


export interface Props {
    friendName: string | undefined;
}

export default function ProfileButton(props: Props) {
    const { showError, showSuccess } = useToast();
    const auth = useAuthUser();
    const login = auth()?.username ?? "User";
    const [follow, setFollow] = useState<boolean>(false);

    const fetchData = async () => {
        const response = await api.get(`/friends/isFriend/${props.friendName}`);
        if (response.data.status === 200)
            setFollow(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFollow = async () => {
        await api.get(`/friends/addfriend/${props.friendName}`).then((response: any) => {
            if (response.data?.message === 'OK') {
                showSuccess('Successfully');
                setFollow(true);
            }
        }).catch((error: any) => showError(error.response.data.message));
    };

    const handleUnFollow = async () => {
        await api.get(`/friends/delete/${props.friendName}`).then((response: any) => {
            if (response.data?.message === 'OK') {
                showSuccess('Successfully');
                setFollow(false);
            }
        }).catch((error: any) => showError(error.response.data.message));

    };
    return (
        <>
            {props.friendName !== login ? (
                <>
                    {follow ? (
                        <Button onClick={handleUnFollow} bsPrefix="btn btn-outline-danger">
                            <i className="bi bi-person-dash fs-4"></i>
                        </Button>
                    ) : (
                        <Button onClick={handleFollow} bsPrefix="btn btn-outline-danger">
                            <i className="bi bi-person-add fs-4"></i>
                        </Button>
                    )}
                    <Button bsPrefix="btn btn-outline-dark">
                        <i className="bi bi-chat-left fs-4"></i>
                    </Button>
                </>
            ) : (
                <UpdateProfile />
            )}
        </>
    );
}