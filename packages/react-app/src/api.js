import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001'
});
api.interceptors.request.use(
	config => {
	  config.headers.Authorization = `Bearer ${accessToken}`;
	  return config;
	},
	error => {
	  return Promise.reject(error);
	}
  );
export default api;