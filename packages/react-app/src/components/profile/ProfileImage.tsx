import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { Button, OverlayTrigger, Tooltip, Image } from "react-bootstrap";
import { getPP } from "../Main";
import UpdatePP from "../UpdatePP";



export interface Props {
	userName: string | undefined,
	pp : string,
	setPP: React.Dispatch<React.SetStateAction<string>>,
}

export default function ProfileImage(props: Props) {
	const [isHovered, setIsHovered] = useState(false);
	const [pp, setPP] = useState('');
	const auth = useAuthUser();
	const user = props.userName;

	const login = auth()?.username ?? "User";
	useEffect(() => {
		const fetchData = async () => {
			setPP(await getPP(props.userName));
		}
		fetchData();
	}, [props.userName, props.pp]);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	const handleUpdatePhoto = () => {
		if (isHovered) {
			return (
				<div
					style={{ position: 'absolute', top: '50%', left: '50%',
						transform: 'translate(-50%, -50%)', background: 'none', border: 'none',
						padding: '0'
					}}
				>
					<UpdatePP pp={props.pp} setPP={props.setPP}/>
				</div>
			);
		}
		return null;
	};
	return (
		<div>
			{user === login ? (
				<div
					style={{ position: 'relative' }}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<Image src={pp} className="image-style" style={{ filter: isHovered ? 'blur(3px)' : 'none' }} />
					{handleUpdatePhoto()}
				</div>
			) : (
				<Image src={pp} className="image-style" />
			)}
		</div>
	);
}