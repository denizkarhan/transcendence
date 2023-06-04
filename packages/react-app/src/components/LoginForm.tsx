import React, { useEffect, useState } from "react";
import { Input, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { Alert, Container, Stack, Card, Button } from "react-bootstrap";
import api from "../api";
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

  const onFinish = async (values: any) => {
    await api
      .post("/auth/login", values)
      .then((response: any) => {
        const user = jwtDecode<decodedToken>(response.data.access_token);
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
  };
  const navigate = useNavigate();
  const [alert, setAlert] = useState<alerts>({
    state: false,
    message: "",
  });
  const handleClick = () => {
    navigate("/register");
  };
  // const user = useSelector((state: any) => state.app.authUser as any) as any;
  // const dispatch = useDispatch();
  // const history = useHistory();

  const fetchAuthUser = async () => {
    const response = await api
      .get("http://localhost:3001/auth/google/redirect", { withCredentials: true })
      .catch((err) => {
        console.log("Not properly authenticated");
        // history.push("/login/error");
      });

    if (response && response.data) {
      console.log("User: ", response.data);
      // history.push("/welcome");
      navigate("/");
    }
  };

  const redirectToGoogleSSO = async () => {
    let timer: NodeJS.Timeout | null = null;
    const googleLoginURL = "http://localhost:3001/auth/google/login";
    const newWindow = window.open(
      googleLoginURL,
      "_blank",
      "width=500,height=600"
    );

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          console.log("Yay we're authenticated");
          fetchAuthUser();
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh', width: '50vh' }}>
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
                  <Button onClick={redirectToGoogleSSO} bsPrefix="btn btn-outline-primary">
                  Google
                </Button>
                  <Button bsPrefix="btn btn-outline-primary">
                    42
                  </Button>
                </Stack>
              </Stack>
            </Form>
          </Card.Body>
        </Card>
      </Stack>
    </Container>
  );
};

export default App;
