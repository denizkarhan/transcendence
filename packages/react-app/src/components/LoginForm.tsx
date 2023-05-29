import React from 'react';
import { Button, Form, Input } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const onFinish = async (values: any) => {
	// console.log('Success:', values);
	const response: AxiosResponse = await axios.post('http://localhost:3001/auth/login', values);
	const accessToken = response.data.access_token;
	// Access token'ı Axios headers'ına ekleyin
	axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
	// console.log(response.headers);
};

const onFinishFailed = (errorInfo: any) => {
	console.log('Failed:', errorInfo);
};

const App: React.FC = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/register')
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
					label="username"
					name="username"
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="password"
					name="password"
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }} labelCol={{ span: 8 }}>
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