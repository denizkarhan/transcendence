import { Container, Stack } from "react-bootstrap";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Nav.css";

const App: React.FC = () => {
	// // const history = useHistory();
	// const handleButtonClick = () => {
	// 	history.push("/login")
	//   };
	
	return (
		<div className="App">
			<Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
				<Stack gap={2} className="scol mx-auto" >
					<Link to="/login">
						<Button variant="outline-info" size="lg" className="mb-1 btn btn-outline-primary" style={{ width: '400px' }}>
							Sign In
						</Button>
					</Link>
					<Link to="/register">
						<Button variant="outline-info" size="lg" className="mb-1" style={{ width: '400px' }}>
							Sign Up
						</Button>
					</Link>
				</Stack>
			</Container>
		</div>
	);
}

export default App;