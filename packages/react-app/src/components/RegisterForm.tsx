import { Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Stack, Card, Button } from "react-bootstrap";
import { useToast } from "./Toast";
import api from "../api";

const App: React.FC = () => {
	const { showError, showSuccess } = useToast();
	const [form] = Form.useForm();
	const navigate = useNavigate();

	const onFinish = (values: any) => {
		const response = api.post("/auth/register", values)
			.then((data: any) => { showSuccess("Redirect to Login"); navigate("/login") })
			.catch((error: any) =>
				showError(error.response?.data.message)
			);
	};

	const handleClick = () => {
		navigate("/login");
	};

	return (
		<div className="App">
			<Container className="d-flex flex-column justify-content-center align-items-center bg-black" style={{ height: '100vh', width: '50vh' }}>
				<Stack gap={3} direction="vertical" style={{ flexDirection: "column", alignSelf: "stretch", alignItems: "stretch" }}>
					<Card>
						<Card.Body>
							<Form className="text-body"
								form={form}
								name="register"
								onFinish={onFinish}
								style={{ maxWidth: 600 }}
								scrollToFirstError
							>
								<Form.Item
									name="Login"
									rules={[
										{
											required: true,
											message: "Please input your nickname!",
											whitespace: true,
										},
									]}
								>
									<Input placeholder="Username" />
								</Form.Item>
								<Form.Item
									name="FirstName"
									rules={[{ required: true, message: "Please input your first name!" }]}
								>
									<Input placeholder="First Name" />
								</Form.Item>

								<Form.Item
									name="LastName"
									rules={[{ required: true, message: "Please input your last name!" }]}
								>
									<Input placeholder="Last Name" />
								</Form.Item>

								<Form.Item
									name="Email"
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
									<Input placeholder="Email" />
								</Form.Item>

								<Form.Item
									name="Password"
									rules={[
										{
											required: true,
											message: "Please input your password!",
										},
									]}
									hasFeedback
								>
									<Input.Password placeholder="Password" />
								</Form.Item>

								<Form.Item
									name="confirm"
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
									<Input.Password placeholder="Password" />
								</Form.Item>
								{/* <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Register
                  </Button>
                  <Button type="ghost" onClick={handleClick}>
                    Login
                  </Button>
                </Form.Item> */}
								<Stack gap={1} direction="horizontal" style={{ flexDirection: "column", alignItems: "stretch" }}>
									<Button type="submit" bsPrefix="btn btn-outline-primary">
										Register
									</Button>
									<Button onClick={handleClick} bsPrefix="btn btn-outline-primary">
										Login
									</Button>
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
