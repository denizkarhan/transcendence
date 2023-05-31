import React from "react";
import "../App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Settings from "./Settings";
import NotFoundPage from "../404/404";
import Profile from "./Profile";
import Logout from "./Logout";
import { RequireAuth } from "react-auth-kit";
// import { UserTemplate } from "./Main";
// // import GameComponent from './game/GameComponent'

// interface Props {
//   logState: boolean;
//   setLogState: React.Dispatch<React.SetStateAction<boolean>>;
//   user: UserTemplate | null;
//   setUser: React.Dispatch<React.SetStateAction<UserTemplate | null>>;
// }

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="login" element={<LoginForm/>}/>
      <Route path="register" element={<RegisterForm />} />
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<RequireAuth loginPath="/login"><Settings/></RequireAuth>}/>
      <Route path="logout" element={<Logout />} />
      {/* <Route path="game" element={<GameComponent/>}/> */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
