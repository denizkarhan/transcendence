import axios from 'axios';
import 'dotenv/config';
import { useLocation, useNavigate } from 'react-router-dom';

export function getCookie(cookieName) {
	const cookieString = document.cookie;
	const cookies = cookieString.split(';');

	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		// Check if the cookie starts with the given name
		if (cookie.startsWith(cookieName + '=')) {
			// Extract the cookie value
			return cookie.substring(cookieName.length + 1);
		}
	}

	// Cookie not found
	return null;
}

console.log(process.env.BACK_END_URI);

const api = axios.create({
	baseURL: process.env.BACK_END_URI,
	headers: {
		'Authorization': 'Bearer ' + getCookie('42_auth'),
	}
});
// api.options("*", cors({ origin: 'Access-Control-Allow-Origin', optionsSuccessStatus: 200 }));
api.interceptors.request.use(req => {
	const auth = getCookie("42_auth");
	if (auth) {
		req.headers["Authorization"] = 'Bearer ' + auth;
	}
	return req;
});
export default api;