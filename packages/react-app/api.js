import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Set your API base URL
  // You can also set other Axios configuration options here, such as headers
});

export default api;