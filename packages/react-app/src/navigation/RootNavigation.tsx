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
import Game from '../game/pong'
import ChatService from '../chat/Chat'


interface Props {
	pp: string,
	setPP: React.Dispatch<React.SetStateAction<string>>,
}

const RootNavigation = (prop: Props) => {
	const isAuthenticated = useIsAuthenticated();
	return (
		<ToastProvider>
			<Routes>
				<Route path="/" element={isAuthenticated() ? <Profile pp={prop.pp} setPP={prop.setPP} /> : <LoginAndRegister />} />
				<Route path="home" element={isAuthenticated() ? <Profile pp={prop.pp} setPP={prop.setPP} /> : <LoginAndRegister />} />
				<Route path="login" element={isAuthenticated() ? <Profile pp={prop.pp} setPP={prop.setPP} /> : <LoginForm />} />
				<Route path="register" element={isAuthenticated() ? <Profile pp={prop.pp} setPP={prop.setPP} /> : <RegisterForm />} />
				<Route path="loginorregister" element={isAuthenticated() ? <Profile pp={prop.pp} setPP={prop.setPP} /> : <LoginAndRegister />} />
				<Route path="profile/:username" element={isAuthenticated() ? <Profile pp={prop.pp} setPP={prop.setPP}/> : <LoginAndRegister />} />
				<Route path="settings" element={isAuthenticated() ? <Settings pp={prop.pp} setPP={prop.setPP} /> : <LoginAndRegister />} />
				<Route path='/game' element={isAuthenticated() ? <Game/> : <LoginAndRegister /> }/>
				<Route path='/chat' element={isAuthenticated() ? <ChatService/> : <LoginAndRegister /> }/>
				<Route path="*" element={ <NotFoundPage /> } />
			</Routes>
		</ToastProvider>
	)
}
export default RootNavigation;
