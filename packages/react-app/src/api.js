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
console.log(window.location.hostname);
const api = axios.create({
	baseURL: "http://10.12.13.5:3001",
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