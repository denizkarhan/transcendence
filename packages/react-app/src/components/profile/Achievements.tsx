import { useEffect, useState } from "react";
import { Alert, Card, Col, Row } from "react-bootstrap";
import api from "../../api";
import { Achievement } from "../../interfaces/achievement";

export interface Props {
	userName: string | undefined;
}

export default function Achievements(props: Props) {
	const [achievements, setAchievement] = useState<Achievement[]>([]);
	const [userAchievement, setUserAchievement] = useState<Achievement[]>([])

	useEffect(() => {
		const fetchData = async () => {
			const resAchiev = await api.get('/achievements/all');
			setAchievement(resAchiev.data);

			const resUserAchiev = await api.get(`/user-achievements/${props.userName}`);
			setUserAchievement(resUserAchiev.data.map((item:any) => item.Achievement));
		}
		fetchData();
	}, [])
	return (
		<Row>
			{achievements.map((achi) => (
				<Col key={achi.Id} lg={4} md={6} sm={12} className="mb-4">
					<Alert variant={userAchievement.find((userAchi => userAchi.Achievement === achi.Achievement)) !== undefined ? 'info' : 'dark'}>
						<div className="d-flex align-items-center" style={{flexDirection: 'column'}}>
							<span>{achi.Achievement}</span>
						</div>
					</Alert>
				</Col>
			))}
		</Row>
	);
}

