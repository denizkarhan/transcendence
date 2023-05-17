import React from 'react';
import './App.css';
import Auth from './components/Auth'
// import { Button } from 'antd';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from './components/MyNavbar'
import Home from './components/Home'
// import { JsxEmit, JsxFlags } from 'typescript';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}>
          <Route path="auth" element={<Auth/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
