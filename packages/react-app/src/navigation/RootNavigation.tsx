import { BrowserRouter, Navigate, Outlet, Route, RouteProps, Routes } from 'react-router-dom'
import Home from '../components/Home'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
// import Logout from '../components/Logout'
import Profile from '../components/Profile'
import Settings from '../components/Settings'
import { RequireAuth, useIsAuthenticated } from "react-auth-kit";
import NotFoundPage from "../404/404";
import LoginAndRegister from '../components/LoginAndRegister'


interface Props {
	pp : string,
	setPP: React.Dispatch<React.SetStateAction<string>>,
}

const RootNavigation = (prop : Props) => {
	const isAuthenticated = useIsAuthenticated();
	return (
		<Routes>
			<Route path="/" element={isAuthenticated() ? <Home /> : <LoginAndRegister />} />
			<Route path="home" element={isAuthenticated() ? <Home />: <LoginAndRegister />} />
			<Route path="login" element={isAuthenticated() ? <Home/> : <LoginForm />} />
			<Route path="register" element={isAuthenticated() ? <Home/> : <RegisterForm />} />
			<Route path="loginorregister" element={isAuthenticated() ? <Home/> : <LoginAndRegister />} />
			<Route path="profile" element={isAuthenticated() ? <Profile /> : <LoginAndRegister />} />
			<Route path="settings" element={isAuthenticated() ? <Settings pp={prop.pp} setPP={prop.setPP}/> : <LoginAndRegister />} />
			{/* <Route path="settings" element= /> */}
			{/* <Route path="logout" element={<RequireAuth loginPath={'/loginorregister'}><Logout /></RequireAuth>} /> */}
			{/* <Route path="game" element={<GameComponent/>}/> */}
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	)
}
export default RootNavigation;
{/* 
// {<RequireAuth loginPath={'/loginorregister'}><Home /></RequireAuth>}
// {<RequireAuth loginPath={'/loginorregister'}><Profile /></RequireAuth>}
// {<RequireAuth loginPath={'/loginorregister'}><Settings /></RequireAuth>}
// {<RequireAuth loginPath={'/loginorregister'}><Home /></RequireAuth>} */}