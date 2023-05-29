import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import api from "../api";
import { UserTemplate } from "./Main";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

interface alerts {
  state: boolean;
  message: string;
}

interface Props {
  setLogState: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<UserTemplate | null>>;
  user: UserTemplate | null;
}

const App: React.FC<Props> = (props: Props) => {
  const onFinish = async (values: any) => {
    // console.log('Success:', values);
    await api
      .post("/auth/login", values)
      .then((response) => {
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access_token}`;
        document.cookie= `access_token=${response.data.access_token}`;
        // navigate("/home");
      })
      .catch((error) => {
        setAlert({
          state: true,
          message: error.response?.data.message,
        });
        console.log(error);
      });
    // await api
    //   .get("/users/profile")
    //   .then((response) => {
    //     props.setUser({
    //       email: response.data.email,
    //       firstname: response.data.FirstName,
    //       lastname: response.data.LastName,
    //       id: response.data.id,
    //       username: response.data.Login,
    //       twofaState: response.data.two_factor_auth,
    //     });
    //   })
    //   .catch();
    console.log(props.user);
    // api.defaults.headers.common[
    //   "Authorization"
    // ] = `Bearer ${response.data.access_token}`;
    //   const accessToken = response.data.access_token;
    //   // Access token'ı Axios headers'ına ekleyin
  };
  const navigate = useNavigate();
  const [alert, setAlert] = useState<alerts>({
    state: false,
    message: "",
  });
  const handleClick = () => {
    navigate("/register");
  };

  const testClick = () => {
    props.setLogState(true);
  };
  return (
    <Container>
      <Form
        name="basic"
        className="centered-container login-box"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 500 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Alert variant="danger" show={alert.state}>
          <Alert.Heading>Error!</Alert.Heading>
          <p>{alert.message}</p>
        </Alert>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }} labelCol={{ span: 8 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
          <Button type="text" onClick={handleClick}>
            Register
          </Button>
          <Button type="text" onClick={testClick}>
            test
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default App;
