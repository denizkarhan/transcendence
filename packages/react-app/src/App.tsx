import React, { useState } from 'react';
import './App.css';
import Auth from './components/Auth'
import { Button } from 'antd';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="auth" element={<Auth/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
