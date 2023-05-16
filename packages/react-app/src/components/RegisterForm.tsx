import {
  Button,
  Form,
  Input,
  Alert,
} from 'antd';
import React from 'react';
import axios from 'axios';


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

interface ChildProps {
  button: React.ReactNode;
}

const App: React.FC<ChildProps> = (props) => {
  const [form] = Form.useForm();

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

  return (
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
				rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name="FirstName"
				label="FirstName"
				rules={[{ required: true, message: 'Please input your first name!'}]}
			>
				<Input/>
			</Form.Item>
      
			<Form.Item
				name="LastName"
				label="LastName"
				rules={[{ required: true, message: 'Please input your last name!'}]}
			>
				<Input/>
			</Form.Item>
			
			<Form.Item
        name="Email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        name="Password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {							
							if (!value || getFieldValue('Password') === value) {
                return Promise.resolve();
              }
            	return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" >
          Register
        </Button>
        {props.button}
      </Form.Item>
    </Form>
  );
};

export default App;