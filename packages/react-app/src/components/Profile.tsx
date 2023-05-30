import { Container } from 'react-bootstrap';
import axios, { AxiosResponse }  from 'axios';
import React from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from "../api";

const onFinish = async (values: any) => {
	// console.log('Success:', values);
	const response: AxiosResponse = await api.get('/users/profile');
	console.log(response.data);
};

const onFinishFailed = (errorInfo: any) => {
	console.log('Failed:', errorInfo);
};


const App: React.FC = () => {
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
  
		  <Form.Item wrapperCol={{ offset: 8, span: 16 }} labelCol={ {span : 8}}>
			<Button type="primary" htmlType="submit">
			  ALÜÜÜ
			</Button>
		  </Form.Item>
		</Form>
	  </Container>
	);
	}
  
  export default App;

// export default function Profile() {
// 	return (
// 		<Container style={{ background: 0 }}>
// 			<h1>This is the Profile page!</h1>
// 		</Container>
// 	);
// }