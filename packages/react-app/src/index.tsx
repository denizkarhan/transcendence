// import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "react-auth-kit";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider
     authType={"cookie"}
     authName={"42_auth"}
     cookieDomain={window.location.hostname}
     cookieSecure={false}
    >
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
