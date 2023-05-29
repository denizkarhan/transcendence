import React from 'react';
import './App.css';
import {Routes, Route } from "react-router-dom";
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Settings from './components/Settings'
import NotFoundPage from './404/404'
import Profile from './components/Profile'
import Logout from './components/Logout'
// import GameComponent from './game/GameComponent'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="home" element={<Home/>}/>
      <Route path="login" element={<LoginForm/>}/>
      <Route path="register" element={<RegisterForm/>}/>
      <Route path="profile" element={<Profile/>}/>
      <Route path="settings" element={<Settings/>}/>
      <Route path="profile" element={<Profile/>}/>
      <Route path="logout" element={<Logout/>}/>
      {/* <Route path="game" element={<GameComponent/>}/> */}
      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
  );
}
