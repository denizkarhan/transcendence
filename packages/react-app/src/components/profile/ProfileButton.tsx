import { useAuthUser } from "react-auth-kit";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import UpdateProfile from "../UpdateProfile";
import api from "../../api";
import { useToast } from "../Toast";
import { useEffect, useState } from "react";
import { error } from "console";
import { User } from "../../interfaces/user";


export interface Props {
	friendName: string | undefined;
	setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
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

	const renderTooltip = (message: string) => (
		<Tooltip id="hover-tooltip">
			{message}
		</Tooltip>
	);

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
						<OverlayTrigger
							placement="bottom"
							overlay={renderTooltip('Click to unfollow user')}
						>

							<Button onClick={handleUnFollow} bsPrefix="btn btn-outline-danger">
								<i className="bi bi-person-dash fs-4"></i>
							</Button>
						</OverlayTrigger>
					) : (
						<OverlayTrigger
							placement="bottom"
							overlay={renderTooltip('Click to follow user')}
						>

							<Button onClick={handleFollow} bsPrefix="btn btn-outline-danger">
								<i className="bi bi-person-add fs-4"></i>
							</Button>
						</OverlayTrigger>
					)}
					<OverlayTrigger
						placement="bottom"
						overlay={renderTooltip('Click to message user')}
					>

						<Button bsPrefix="btn btn-outline-dark">
							<i className="bi bi-chat-left fs-4"></i>
						</Button>
					</OverlayTrigger>
				</>
			) : (
				<UpdateProfile setUser={props.setUser} />
			)}
		</>
	);
}