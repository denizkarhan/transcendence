import { Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import Profile from '../components/profile/Profile'
import Settings from '../components/Settings'
import { useIsAuthenticated } from "react-auth-kit";
import NotFoundPage from "../404/404";
import LoginAndRegister from '../components/LoginAndRegister';
import { ToastProvider } from '../components/Toast'
import "bootswatch/dist/lumen/bootstrap.min.css";
import Canvas from '../game/Canvas'
import Game from '../game/pong'


interface Props {
	pp: string,
	setPP: React.Dispatch<React.SetStateAction<string>>,
}

const RootNavigation = (prop: Props) => {
	const isAuthenticated = useIsAuthenticated();
	return (
		<ToastProvider>
			<Routes>
				<Route path="/" element={isAuthenticated() ? <Home /> : <LoginAndRegister />} />
				<Route path="home" element={isAuthenticated() ? <Home /> : <LoginAndRegister />} />
				<Route path="login" element={isAuthenticated() ? <Home /> : <LoginForm />} />
				<Route path="register" element={isAuthenticated() ? <Home /> : <RegisterForm />} />
				<Route path="loginorregister" element={isAuthenticated() ? <Home /> : <LoginAndRegister />} />
				<Route path="profile/:username" element={isAuthenticated() ? <Profile pp={prop.pp} setPP={prop.setPP}/> : <LoginAndRegister />} />
				<Route path="settings" element={isAuthenticated() ? <Settings pp={prop.pp} setPP={prop.setPP} /> : <LoginAndRegister />} />
				<Route path="*" element={<NotFoundPage />} />
				<Route path='/game' element={<Game/>}/>
			</Routes>
		</ToastProvider>
	)
}
export default RootNavigation;
