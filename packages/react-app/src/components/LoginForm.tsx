<<<<<<< HEAD
import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const onFinish = (values: any) => {
  // console.log('Success:', values);
  axios.post('http://localhost:3001/users/', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const App: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signup')
  }
  return (
    <Container >
      <Form
        name="basic"
        className='centered-container login-box'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 500 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        >
        <Form.Item
          label="Login"
          name="login"
          rules={[{ required: true, message: 'Please input your username!' }]}
          >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
          >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }} labelCol={ {span : 8}}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
          <Button type="text" onClick={handleClick}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
  }

export default App;
=======
import React, { useEffect, useState } from "react";
import { Input, Form } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, Container, Stack, Card, Button } from "react-bootstrap";
import api, { getCookie, deleteCookie } from "../api";
import { useSignIn } from "react-auth-kit";
import jwtDecode from "jwt-decode";

const onFinishFailed = (errorInfo: any) => {
	console.log("Failed:", errorInfo);
};

interface alerts {
	state: boolean;
	message: string;
}

interface decodedToken {
	id: number,
	Login: string,
	exp: number,
	iat: number
};


const App: React.FC = () => {
	const signin = useSignIn();
	const navigate = useNavigate();
	const [user, setUser] = useState<string | null>('');
	const [token, setToken] = useState<string | null>('');
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
			navigate("/")
		}
		else if (user){
			navigate("/tfa");
		}
	})
	const onFinish = async (values: any) => {
		await api
			.post("/auth/login", values)
			.then((response: any) => {
				if (response.data.username)
				{
					document.cookie = `user=${response.data.username}; expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/`;
					navigate("/tfa");
				}
				const user = jwtDecode<decodedToken>(response.data.access_token);
				signin({
					token: response.data.access_token,
					tokenType: "Bearer",
					expiresIn: 9999,
					authState: { username: user.Login }
				});
				navigate("/home");
			})
			.catch((error: any) => {
				setAlert({
					state: true,
					message: error.response?.data.message,
				});

			});
	};
	const [alert, setAlert] = useState<alerts>({
		state: false,
		message: "",
	});
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
			<Container className="d-flex flex-column justify-content-center align-items-center bg-black" style={{ height: '100vh', width: '50vh' }}>
				<Stack gap={3} direction="vertical" style={{ flexDirection: "column", alignSelf: "stretch", alignItems: "stretch" }}>
					<Card>
						<Card.Body>
							<Form
								name="basic"
								className="login-box"
								initialValues={{ remember: true }}
								onFinish={onFinish}
								onFinishFailed={onFinishFailed}
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
								<Alert variant="danger" show={alert.state}>
									<Alert.Heading>Error!</Alert.Heading>
									<p>{alert.message}</p>
								</Alert>
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
>>>>>>> main
