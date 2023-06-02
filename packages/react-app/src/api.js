import axios from 'axios';

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

const api = axios.create({
	baseURL: 'http://localhost:3001',
	headers: {
		'Authorization': 'Bearer ' + getCookie('42_auth')
	}
});

api.interceptors.request.use(req => {
	const auth = getCookie("42_auth");
	if (auth) {
		req.headers[ "Authorization" ] = 'Bearer ' + auth;
	}
	return req;
});
export default api;