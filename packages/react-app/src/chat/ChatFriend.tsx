import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { Socket } from "socket.io-client";
import api from "../api";
import { getPP } from "../components/Main";
import { Room } from "../interfaces/room";
import { User } from "../interfaces/user";
import "./chat.css";

interface Props {
	socket: Socket;
	user: string;
	setActiveTab: React.Dispatch<React.SetStateAction<string>>;
	setRoom: React.Dispatch<React.SetStateAction<Room | null>>;
}

export default function ChatFriend(props: Props) {
	const [friends, setFriends] = useState<User[] | null>(null);
	const [pp, setPP] = useState<string[]>([]);
	useEffect(() => {
		const fetchData = async () => {
			const resFriend = await api.get('/friends/all');
			if (Array.isArray(resFriend.data)) {
				setFriends(resFriend.data);
				const profilePhotos = await Promise.all(
					resFriend.data.map(async (user) => await getPP(user.Login))
				);
				setPP(profilePhotos);
			}
		}
		fetchData();
	}, [])

	const setUser = (sendFriend: string) => {
		console.log(sendFriend);
		props.socket.emit('createPrivMessage', { Sender: props.user, Receiver: sendFriend })
	}

	return (
		<>
			{Array.isArray(friends) ? (friends.map((user, index) => (
				<div style={{ width: '100%' }} key={index} onClick={() => setUser(user.Login)}>
					<li
						className="p-2 border-bottom"
						style={{
							borderBottom: "1px solid",
							listStyleType: 'none'
						}}
					>
						<a
							className="d-flex justify-content-between link-light"
						>
							<div className="d-flex flex-row">
								<span
									style={{
										backgroundImage: `url(${pp.at(index)})`,
										width: '50px',
										height: '50px',
										display: 'inline-block',
										backgroundSize: 'cover',
										border: `2px solid ${(user?.Status === 'online') ? '#14A44D' : '#DC4C64'}`,
										borderRadius: '50%',
										borderWidth: '3px'
									}}
									className="avatar avatar-xl mr-3"></span>
								<div className="pt-1">
									<p className="fw-bold mb-0">{user.FirstName} {user.LastName}</p>
									<p className="small text-white">
										{user.Login}
									</p>
								</div>
							</div>
						</a>
					</li>
				</div>
			))) : null}
		</>
		// <ul className="friend-list">
		// 	{Array.isArray(friends) ? (friends.map((user, index) => (
		// 		<li  key={index} onClick={() => setUser(user.Login)} className="active bounceInDown">
		// 			<a href="#" className="clearfix">
		// 				<Image src={pp.at(index)} alt="" className="img-circle" />
		// 				<div className="friend-name">
		// 					<strong>{user.Login}</strong>
		// 				</div>
		// 			</a>
		// 		</li>
		// 	))
		// 	) : null}
		// </ul>
	);

}