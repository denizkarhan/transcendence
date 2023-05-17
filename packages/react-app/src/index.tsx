// import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Nav from './components/MyNavbar'

const { Header, Content, Footer, Sider } = Layout;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <head>
      <link href="theme.css"/>
    </head>
    <Nav/>
    <App />
    <Footer className='footer'>Winx Club ©2023 Created by Winx Club Members</Footer>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
