import { useEffect, useState } from "react";
import api from "../../api";
import { isBlock } from "../Main";
import { useToast } from "../Toast";
import { useAuthUser } from "react-auth-kit";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

export interface Props {
    userName: string | undefined;
}


export default function Block(props: Props) {
    const { showError, showSuccess } = useToast();
    const [block, setBlock] = useState(false);
    const auth = useAuthUser();

    const login = auth()?.username ?? "User";

    useEffect(() => {
        const fetchData = async () => {
            setBlock((await isBlock(login, props.userName)));
        }

        fetchData();
    }, [])
    const handleBlock = async () => {
        const response = await api.get(`/block-user/${props.userName}`);
        if (response.data.status === 200) {
            showSuccess(' is blocking');
            setBlock(true);
        }
        else
            showError(response.data.messages);
    }

    const handleUnBlock = async () => {
        const response = await api.get(`/block-user/unblock/${props.userName}`);
        if (response.data.status === 200) {
            showSuccess(' block has been removed');
            setBlock(false);
        }
        else
            showError(response.data.messages);
    }

    const renderTooltip = (message: string) => (
        <Tooltip id="hover-tooltip">
            {message}
        </Tooltip>
    );

    return (<>{(props.userName !== login) ? ((block) ?
        <OverlayTrigger
            placement="top"
            overlay={renderTooltip('Click to unblock user')}
        >
            <Button onClick={handleUnBlock} bsPrefix="btn btn-outline-warning">
                <i className="bi bi-person-check-fill fs-4"></i>
            </Button>
        </OverlayTrigger>
        :
        <OverlayTrigger
            placement="top"
            overlay={renderTooltip('Click to block user')}
        >
            <Button onClick={handleBlock} bsPrefix="btn btn-outline-warning">
                <i className="bi bi-person-fill-slash fs-4"></i>
            </Button>
        </OverlayTrigger>
    ) : null}</>)
}