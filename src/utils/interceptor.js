import axios from "axios";
 
const myAxios = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});
 
myAxios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Request sent", config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
 
export default myAxios;

