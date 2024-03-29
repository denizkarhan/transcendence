import axios from 'axios';
// import 'dotenv/config';

export function getCookie(cookieName) {
	const cookieString = document.cookie;
	const cookies = cookieString.split(';');

	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		if (cookie.startsWith(cookieName + '=')) {
			return cookie.substring(cookieName.length + 1);
		}
	}
	return null;
}


export function deleteCookie(name) {
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// console.log(process.env.BACK_END_URI);
const api = axios.create({
	baseURL: "http://k2m13s05.42kocaeli.com.tr:3001",
	headers: {
		'Authorization': 'Bearer ' + getCookie('42_auth'),
	}
});

api.interceptors.request.use(req => {
	const auth = getCookie("42_auth");
	if (auth) {
		req.headers["Authorization"] = 'Bearer ' + auth;
	}
	return req;
});
export default api;