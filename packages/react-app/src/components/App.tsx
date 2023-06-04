import React from "react";
import "../App.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "bootswatch/dist/lumen/bootstrap.min.css";
// import GameComponent from './game/GameComponent'
import RootNavigation from "../navigation/RootNavigation";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App() {

  return (
    <RootNavigation />
  );
}