import React, { useState } from 'react';
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { Button } from 'antd';


export default function Auth() {
  const [prompt, setPrompt] = useState('Register');
  const [showComponent1, setShowComponent1] = useState(true);
  const [showComponent2, setShowComponent2] = useState(false);
  const handleClick = () => {
    setPrompt(prompt === 'Register' ? 'Login' : 'Register')
    setShowComponent1(!showComponent1);
    setShowComponent2(!showComponent2);
  }
  let prop : React.ReactNode = <Button onClick={handleClick} type="primary"> {prompt} </Button>;
  return (
    <div className="App">
      {showComponent1 && <LoginForm button={prop}/>}
      {showComponent2 && <RegisterForm button={prop}/>}
    </div>
  );
}
