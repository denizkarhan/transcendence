import { useEffect, useState } from "react";
import { Match } from '../../interfaces/match';
import { format } from 'date-fns';
import { Alert} from "react-bootstrap";
import api from "../../api";

export interface Props {
	userName: string | undefined;
}

export default function Matches(props: Props) {
	const [matches, setMatches] = useState<Match[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const resMatch = await api.get(`/match-histories/${props.userName}`);
			if (resMatch.data.length !== 0)
				setMatches(resMatch.data);
		}
		fetchData();
	}, [props.userName])

	return (<div className="match-results-container" style={{marginTop:'4%'}}>
		{matches.map((match) => (
			<Alert key={match?.Id} variant={match.MatchResult === 1 ? 'primary' : match.MatchResult === 0 ? 'warning' : 'danger'}>
				<div className="d-flex justify-content-between align-items-center">
					<span>{props.userName}</span>
					<span>{match.MyResult}</span>
					<span>{format(new Date(match.MatchDate.toString()), 'dd MMM')}</span>
					<span>{match.EnemyResult}</span>
					<span>{match.Enemy.Login}</span>
				</div>
			</Alert>
		))}
	</div>);
}