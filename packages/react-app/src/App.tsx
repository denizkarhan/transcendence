import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home'
import Profile from './components/Profile'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

export default function App() {
  return (
    <Routes>
      <Route path="home" element={<Home/>}></Route>
      <Route path="signin" element={<LoginForm/>}></Route>
      <Route path="signup" element={<RegisterForm/>}></Route>
      <Route path="profile" element={<Profile/>}></Route>
    </Routes>
  );
}
