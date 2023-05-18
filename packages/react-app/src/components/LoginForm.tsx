import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <Form
      name="basic"
      className='centered-container'
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
  );
  }

export default App;