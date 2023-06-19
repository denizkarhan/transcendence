import React, { useEffect, useState } from "react";
import { Input, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { Container, Stack, Card, Button } from "react-bootstrap";
import api, { getCookie, deleteCookie } from "../api";
import { useSignIn } from "react-auth-kit";
import jwtDecode from "jwt-decode";
import ModalComponent from "./Tfa";
import { useToast } from "./Toast";

interface decodedToken {
	id: number,
	Login: string,
	exp: number,
	iat: number
};


const App: React.FC = () => {
	const {showError, showSuccess} = useToast();
	const [showModal, setShowModal] = useState(false);
	const signin = useSignIn();
	const navigate = useNavigate();
	const [user, setUser] = useState<string | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const handleCloseModal = () => {
		deleteCookie('user');
		setShowModal(false);
	}
	useEffect(() => {
		setToken(getCookie('token'));
		setUser(getCookie('user'));
		if (token) {
			const user = jwtDecode<decodedToken>(token);
			signin({
				token: token,
				tokenType: "Bearer",
				expiresIn: 9999,
				authState: { username: user.Login }
			});
			deleteCookie("token");
			showSuccess("Successful");
			navigate("/")
		}
		else if (user) {
			setShowModal(true);
		}
	}, [token, user]);
	const onFinish = async (values: any) => {
		await api
			.post("/auth/login", values)
			.then((response: any) => {
				if (response.data.username) {
					document.cookie = `user=${response.data.username}; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/`;
					setShowModal(true);
				}
				const user = jwtDecode<decodedToken>(response.data.access_token);
				signin({
					token: response.data.access_token,
					tokenType: "Bearer",
					expiresIn: 9999999,
					authState: { username: user.Login }
				});
				showSuccess("Successful");
				navigate("/home");
			})
			.catch((error: any) => {
				showError(error.response?.data.message)
			});
	};
	const handleClick = () => {
		navigate("/register");
	};

	const handleGoogleLogin = async () => {
		window.location.href = 'http://localhost:3001/auth/google/login';
	};
	const handleFTLogin = async () => {
		window.location.href = 'http://localhost:3001/ft-auth/login';
	};
	return (
		<div className="App">
			<Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh', width: '50vh' }}>
				<Stack gap={3} direction="vertical" style={{ flexDirection: "column", alignSelf: "stretch", alignItems: "stretch" }}>
					<Card>
						<Card.Body>
							<Form
								name="basic"
								className="login-box"
								initialValues={{ remember: true }}
								onFinish={onFinish}
								autoComplete="off"
							>
								<Form.Item
									name="username"
									rules={[{ required: true, message: "Please input your username!" }]}
								>
									<Input placeholder="Username" />
								</Form.Item>
								<Form.Item
									name="password"
									rules={[{ required: true, message: "Please input your password!" }]}
								>
									<Input.Password placeholder="Password" />
								</Form.Item>
								<ModalComponent show={showModal} onHide={handleCloseModal} />
								<Stack gap={1} direction="vertical" style={{ flexDirection: "column", alignItems: "stretch" }}>
									<Stack gap={1} direction="vertical" style={{ flexDirection: "column", alignItems: "stretch" }}>
										<Button type="submit" bsPrefix="btn btn-outline-primary">
											Login
										</Button>
										<Button bsPrefix="btn btn-outline-primary" onClick={handleClick}>
											Register
										</Button>
									</Stack>
									<Stack gap={1} direction="horizontal" style={{ flexDirection: "column", alignItems: "stretch" }}>
										<Button onClick={handleGoogleLogin} bsPrefix="btn btn-outline-primary">
											Google
										</Button>
										<Button onClick={handleFTLogin} bsPrefix="btn btn-outline-primary">
											42
										</Button>
									</Stack>
								</Stack>
							</Form>
						</Card.Body>
					</Card>
				</Stack>
			</Container>
		</div>
	);
};

export default App;
