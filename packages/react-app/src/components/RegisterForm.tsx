<<<<<<< HEAD
import {
  Button,
  Form,
  Input,
  Alert,
} from 'antd';
import React from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

=======
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { Container } from "react-bootstrap";
import axios from "axios";
>>>>>>> main

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

<<<<<<< HEAD
=======
interface alerts {
  state: boolean;
  message: string;
}
>>>>>>> main

const App: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
<<<<<<< HEAD

  const onFinish = (values: any) => {
    // console.log('Received values of form: ', values);
    axios.post('http://localhost:3001/users', values);
    return (
      <Alert
        message="Error Text"
        description="Error Description"
        type='error'
        closable
      />
    );
  };

  const handleClick = () => {
    navigate("/signin");
  }
=======
  const [alert, setAlert] = useState<alerts>({
    state: false,
    message: "",
  });

  const onFinish = (values: any) => {
    axios
      .post("http://localhost:3001/auth/register", values)
      .then((data:any) => navigate("/login"))
      .catch((error:any) =>
        setAlert({
          state: true,
          message: error.response?.data.message,
        })
      );
    // navigate("/login");
  };

  const handleClick = () => {
    navigate("/login");
  };
>>>>>>> main

  return (
    <Container>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name="Login"
          label="Nickname"
          tooltip="What do you want others to call you?"
<<<<<<< HEAD
          rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
=======
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
            },
          ]}
>>>>>>> main
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="FirstName"
          label="FirstName"
<<<<<<< HEAD
          rules={[{ required: true, message: 'Please input your first name!' }]}
=======
          rules={[{ required: true, message: "Please input your first name!" }]}
>>>>>>> main
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="LastName"
          label="LastName"
<<<<<<< HEAD
          rules={[{ required: true, message: 'Please input your last name!' }]}
=======
          rules={[{ required: true, message: "Please input your last name!" }]}
>>>>>>> main
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="Email"
          label="E-mail"
          rules={[
            {
<<<<<<< HEAD
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
=======
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
>>>>>>> main
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="Password"
          label="Password"
          rules={[
            {
              required: true,
<<<<<<< HEAD
              message: 'Please input your password!',
=======
              message: "Please input your password!",
>>>>>>> main
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
<<<<<<< HEAD
          dependencies={['password']}
=======
          dependencies={["password"]}
>>>>>>> main
          hasFeedback
          rules={[
            {
              required: true,
<<<<<<< HEAD
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('Password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
=======
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("Password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
>>>>>>> main
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
<<<<<<< HEAD
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" >
=======
        <Alert variant="danger" show={alert.state}>
          <Alert.Heading>Error!</Alert.Heading>
          <p>{alert.message}</p>
        </Alert>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
>>>>>>> main
            Register
          </Button>
          <Button type="ghost" onClick={handleClick}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> main
