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
        await api.get(`/friends/isFriend/${props.friendName}`).then((response:any)=>{
            setFollow(true);
        }).catch((error:any)=> setFollow(false))
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
                            Unfollow
                        </Button>
                    ) : (
                        <Button onClick={handleFollow} bsPrefix="btn btn-outline-danger">
                            Follow
                        </Button>
                    )}
                    <Button bsPrefix="btn btn-outline-primary">Message</Button>
                </>
            ) : (
                <UpdateProfile />
            )}
        </>
    );
}