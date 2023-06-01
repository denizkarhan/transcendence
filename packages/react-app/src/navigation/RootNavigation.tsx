import { BrowserRouter, Navigate, Outlet, Route, RouteProps, Routes } from 'react-router-dom'
import Home from '../components/Home'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import Logout from '../components/Logout'
import Profile from '../components/Profile'
import Settings from '../components/Settings'
import { RequireAuth, useIsAuthenticated} from "react-auth-kit";
import NotFoundPage from "../404/404";
import LoginAndRegister from '../components/LoginAndRegister'

const RootNavigation = () => {
	return (
			<Routes>
				<Route path="/" element={<RequireAuth loginPath={'/loginorregister'}><Home /></RequireAuth>} />
				<Route path="home" element={<RequireAuth loginPath={'/loginorregister'}><Home /></RequireAuth>} />
				<Route path="login" element={<LoginForm />} />
				<Route path="register" element={<RegisterForm />} />
				<Route path="loginorregister" element={<LoginAndRegister />} />
				<Route path="profile" element={<RequireAuth loginPath={'/loginorregister'}><Profile /></RequireAuth>} />
				<Route path="settings" element={<RequireAuth loginPath={'/loginorregister'}><Settings /></RequireAuth>} />
				<Route path="logout" element={<RequireAuth loginPath={'/loginorregister'}><Logout /></RequireAuth>} />
				{/* <Route path="game" element={<GameComponent/>}/> */}
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
	)
}

export default RootNavigation