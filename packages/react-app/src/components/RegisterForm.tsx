import { Button, Form, Input } from "antd";
import React, {useState} from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import { Container } from "react-bootstrap";
import axios from "axios";

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

interface alerts {
  state : boolean,
  message: string
}

const App: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [alert, setAlert] = useState<alerts>({
    state: false,
    message: ''
  });

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post("http://localhost:3001/users", values);
      navigate("/login");
    } catch (error:any) {
      setAlert({
        state: true,
        message: error.response?.data.message
      });
      // console.log(error.response?.status);
    }
  };

  const handleClick = () => {
    navigate("/login");
  };

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
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="FirstName"
          label="FirstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="LastName"
          label="LastName"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="Email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
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
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
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
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Alert variant="danger" show={alert.state}>
          <Alert.Heading>Error!</Alert.Heading>
          <p>{alert.message}</p>
        </Alert>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
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

export default App;
