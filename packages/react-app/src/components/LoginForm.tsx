import React, { useState } from "react";
import { Input, Form, Button, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { Alert, Col, Container, Row, Stack, TabContent } from "react-bootstrap";
import api from "../api";
import { useSignIn } from "react-auth-kit";
import jwtDecode from "jwt-decode";
// import Form from 'react-bootstrap/Form';
// import { UserTemplate } from "./Main";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

interface alerts {
  state: boolean;
  message: string;
}

// interface Props {
//   setLogState: React.Dispatch<React.SetStateAction<boolean>>;
//   setUser: React.Dispatch<React.SetStateAction<UserTemplate | null>>;
//   user: UserTemplate | null;
// }

interface decodedToken {
  id: number,
  Login: string,
  exp: number,
  iat: number
};

const App: React.FC = () => {
  const signin = useSignIn();

  const onFinish = async (values: any) => {
    // console.log('Success:', values);
    await api
      .post("/auth/login", values)
      .then((response: any) => {
        const user = jwtDecode<decodedToken>(response.data.access_token);
		// api.defaults.headers.common[
		// 	"Authorization"
		//   ] = 'Bearer ' + getCookie('42_auth');
        signin({
          token: response.data.access_token,
          tokenType: "Bearer",
          expiresIn: user.exp,
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
  return (
    <div className="login template d-flex flex-column justify-content-center align-items-center 100-w vh-100">
      <Container className="p-5 rounded bg-white">
        <Form
          name="basic"
          className="centered-container login-box"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 5000 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            // label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            // label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password  placeholder="Password" />
          </Form.Item>
          <Alert variant="danger" show={alert.state}>
            <Alert.Heading>Error!</Alert.Heading>
            <p>{alert.message}</p>
          </Alert>
          <Form.Item className="justify-content-center align-items-center" wrapperCol={{ offset: 8, span: 16 }} labelCol={{ span: 8 }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <Button type="text" onClick={handleClick}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </div>
  );
};

export default App;
