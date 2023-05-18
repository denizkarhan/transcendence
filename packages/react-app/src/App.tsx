import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Settings from './components/Settings'
import NotFoundPage from './components/NotFoundPage'
import Profile from './components/Profile'
import Logout from './components/Logout'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="home" element={<Home/>}/>
      <Route path="signin" element={<LoginForm/>}/>
      <Route path="signup" element={<RegisterForm/>}/>
      <Route path="profile" element={<Profile/>}/>
      <Route path="settings" element={<Settings/>}/>
      <Route path="profile" element={<Profile/>}/>
      <Route path="logout" element={<Logout/>}/>
      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
  );
}
