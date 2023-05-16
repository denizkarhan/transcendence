import React, { useState } from 'react';
import './App.css';
import Auth from './components/Auth'
import { Button } from 'antd';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Navbar content=<Home/> />}> */}
          <Route path="auth" element={<Navbar content=<Auth/> />}></Route>
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}
